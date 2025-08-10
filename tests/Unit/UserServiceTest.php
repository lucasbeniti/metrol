<?php


use App\Enums\UserRolesEnum;
use App\Exceptions\UserAlreadyExistsException;
use App\Exceptions\UserCannotBeDeletedException;
use App\Http\Repositories\User\UserRepositoryInterface;
use App\Http\Services\Log\LogServiceInterface;
use App\Http\Services\User\UserService;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Mockery;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->repository = Mockery::mock(UserRepositoryInterface::class);

    app()->instance(LogServiceInterface::class, Mockery::mock(LogServiceInterface::class)->shouldIgnoreMissing());

    $fakeAuthUser = new User(['name' => 'Tester', 'identification' => '999']);
    Auth::shouldReceive('user')->andReturn($fakeAuthUser);

    $this->service = new UserService($this->repository);
});

it('retorna todos os usuários', function () {
    $users = new Collection([new User(['name' => 'John Doe'])]);

    $this->repository
        ->shouldReceive('getAll')
        ->once()
        ->andReturn($users);

    $result = $this->service->getAll();

    expect($result)->toHaveCount(1);
    expect($result->first()->name)->toBe('John Doe');
});

it('cria um novo usuário com senha padrão', function () {
    $data = ['identification' => '123456', 'name' => 'Jane Doe'];

    $this->repository
        ->shouldReceive('getByIdentification')
        ->with('123456')
        ->once()
        ->andReturn(null);

    $userRoleMock = new \stdClass();
    $userRoleMock->name = 'Admin';

    $user = new User(['name' => 'Jane Doe', 'identification' => '123456']);
    $user->setRelation('userRole', $userRoleMock);

    $this->repository
        ->shouldReceive('store')
        ->once()
        ->andReturn($user);

    $createdUser = $this->service->store($data);

    expect($createdUser->name)->toBe('Jane Doe');
});

it('lança exceção ao tentar criar usuário com identificação duplicada', function () {
    $data = ['identification' => '123456', 'name' => 'Jane Doe'];

    $this->repository
        ->shouldReceive('getByIdentification')
        ->with('123456')
        ->andReturn(new User());

    $this->service->store($data);
})->throws(UserAlreadyExistsException::class);

it('remove um usuário com sucesso', function () {
    $user = Mockery::mock(User::class)->makePartial();
    $user->name = 'John Doe';
    $user->user_role_id = UserRolesEnum::ADMIN;
    $user->shouldReceive('logs->count')->andReturn(0);

    $this->repository
        ->shouldReceive('getById')
        ->with(1)
        ->andReturn($user);

    $this->repository
        ->shouldReceive('destroy')
        ->with(1)
        ->andReturn(true);

    $result = $this->service->destroy(1);

    expect($result)->toBeTrue();
});

it('lança exceção ao tentar remover usuário com logs', function () {
    $user = Mockery::mock(User::class)->makePartial();
    $user->user_role_id = UserRolesEnum::ADMIN;
    $user->shouldReceive('logs->count')->andReturn(1);

    $this->repository
        ->shouldReceive('getById')
        ->with(1)
        ->andReturn($user);

    $this->service->destroy(1);
})->throws(UserCannotBeDeletedException::class);