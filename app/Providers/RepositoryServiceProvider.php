<?php

namespace App\Providers;

use App\Http\Repositories\Client\ClientRepositoryInterface;
use App\Http\Repositories\User\UserRepositoryInterface;
use App\Http\Repositories\CostCenter\CostCenterRepositoryInterface;
use App\Http\Repositories\Client\ClientRepository;
use App\Http\Repositories\CostCenter\CostCenterRepository;
use App\Http\Repositories\Item\ItemRepository;
use App\Http\Repositories\Item\ItemRepositoryInterface;
use App\Http\Repositories\Log\LogRepository;
use App\Http\Repositories\Log\LogRepositoryInterface;
use App\Http\Repositories\Machine\MachineRepository;
use App\Http\Repositories\Machine\MachineRepositoryInterface;
use App\Http\Repositories\MetrologyCall\MetrologyCallRepository;
use App\Http\Repositories\MetrologyCall\MetrologyCallRepositoryInterface;
use App\Http\Repositories\Operation\OperationRepository;
use App\Http\Repositories\Operation\OperationRepositoryInterface;
use App\Http\Repositories\User\UserRepository;
use App\Http\Services\User\UserServiceInterface;
use App\Http\Services\User\UserService;
use App\Http\Services\Client\ClientServiceInterface;
use App\Http\Services\Client\ClientService;
use App\Http\Services\CostCenter\CostCenterService;
use App\Http\Services\CostCenter\CostCenterServiceInterface;
use App\Http\Services\Item\ItemService;
use App\Http\Services\Item\ItemServiceInterface;
use App\Http\Services\Log\LogService;
use App\Http\Services\Log\LogServiceInterface;
use App\Http\Services\Machine\MachineService;
use App\Http\Services\Machine\MachineServiceInterface;
use App\Http\Services\MetrologyCall\MetrologyCallService;
use App\Http\Services\MetrologyCall\MetrologyCallServiceInterface;
use App\Http\Services\Operation\OperationService;
use App\Http\Services\Operation\OperationServiceInterface;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(UserServiceInterface::class, UserService::class);

        $this->app->bind(ClientRepositoryInterface::class, ClientRepository::class);
        $this->app->bind(ClientServiceInterface::class, ClientService::class);

        $this->app->bind(CostCenterRepositoryInterface::class, CostCenterRepository::class);
        $this->app->bind(CostCenterServiceInterface::class, CostCenterService::class);

        $this->app->bind(ItemRepositoryInterface::class, ItemRepository::class);
        $this->app->bind(ItemServiceInterface::class, ItemService::class);

        $this->app->bind(MachineRepositoryInterface::class, MachineRepository::class);
        $this->app->bind(MachineServiceInterface::class, MachineService::class);

        $this->app->bind(MetrologyCallRepositoryInterface::class, MetrologyCallRepository::class);
        $this->app->bind(MetrologyCallServiceInterface::class, MetrologyCallService::class);

        $this->app->bind(OperationRepositoryInterface::class, OperationRepository::class);
        $this->app->bind(OperationServiceInterface::class, OperationService::class);

        $this->app->bind(LogRepositoryInterface::class, LogRepository::class);
        $this->app->bind(LogServiceInterface::class, LogService::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}