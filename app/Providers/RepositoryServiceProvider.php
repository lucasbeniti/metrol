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
use App\Http\Services\Dashboard\DashboardService;
use App\Http\Services\Dashboard\DashboardServiceInterface;
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
        $bindings = [
            UserRepositoryInterface::class => UserRepository::class,
            ClientRepositoryInterface::class => ClientRepository::class,
            CostCenterRepositoryInterface::class => CostCenterRepository::class,
            ItemRepositoryInterface::class => ItemRepository::class,
            MachineRepositoryInterface::class => MachineRepository::class,
            MetrologyCallRepositoryInterface::class => MetrologyCallRepository::class,
            OperationRepositoryInterface::class => OperationRepository::class,
            LogRepositoryInterface::class => LogRepository::class,

            UserServiceInterface::class => UserService::class,
            ClientServiceInterface::class => ClientService::class,
            CostCenterServiceInterface::class => CostCenterService::class,
            ItemServiceInterface::class => ItemService::class,
            MachineServiceInterface::class => MachineService::class,
            MetrologyCallServiceInterface::class => MetrologyCallService::class,
            OperationServiceInterface::class => OperationService::class,
            LogServiceInterface::class => LogService::class,
            DashboardServiceInterface::class => DashboardService::class, 
        ];

        foreach ($bindings as $interface => $implementation) {
            $this->app->bind($interface, $implementation);
        }
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