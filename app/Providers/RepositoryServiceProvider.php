<?php

namespace App\Providers;

use App\Http\Repositories\Client\ClientRepositoryInterface;
use App\Http\Repositories\User\UserRepositoryInterface;
use App\Http\Repositories\CostCenter\CostCenterRepositoryInterface;
use App\Http\Repositories\Client\ClientRepository;
use App\Http\Repositories\CostCenter\CostCenterRepository;
use App\Http\Repositories\User\UserRepository;
use App\Http\Services\User\UserServiceInterface;
use App\Http\Services\User\UserService;
use App\Http\Services\Client\ClientServiceInterface;
use App\Http\Services\Client\ClientService;
use App\Http\Services\CostCenter\CostCenterService;
use App\Http\Services\CostCenter\CostCenterServiceInterface;
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