<?php

namespace App\Traits;

use App\Enums\LogActionsEnum;
use App\Http\Services\Log\LogServiceInterface;
use Illuminate\Support\Facades\Auth;

trait LogsTrait
{
    protected LogServiceInterface $logService;

    public function initializeLogsTrait(): void
    {
        $this->logService = app(LogServiceInterface::class);
    }

    protected function storeLog(
        int $actionId,
        string $entityName,
        string $entityValue,
        int $tableId,
        array $details = []
    ): void {
        $isEntityMachineOrOperation = in_array($entityName, ['máquina', 'operação']);

        $actionText = match ($actionId) {
            LogActionsEnum::CREATE => 'criou ' . ($isEntityMachineOrOperation ? 'a' : 'o'),
            LogActionsEnum::UPDATE => 'atualizou ' . ($isEntityMachineOrOperation ? 'a' : 'o'),
            LogActionsEnum::DELETE => 'deletou ' . ($isEntityMachineOrOperation ? 'a' : 'o'),
            default => 'realizou uma ação em'
        };
        
        $authenticatedUser = Auth::user();

        $description = sprintf(
            'O usuário %s %s %s %s',
            $authenticatedUser->name,
            $actionText,
            $entityName,
            $entityValue
        );

        $this->logService->store([
            'user_id' => $authenticatedUser->id,
            'action_id' => $actionId,
            'description' => $description,
            'table_id' => $tableId,
            'details' => $details
        ]);
    }
}