<?php

namespace App\Traits;

use App\Http\Services\Log\LogServiceInterface;
use Illuminate\Support\Facades\Auth;

trait LogsTrait
{
    protected function storeLog(
        LogServiceInterface $logService,
        int $actionId,
        string $entityName,
        string $entityValue,
        int $tableId,
        array $details = []
    ): void {
        $isEntityMachineOrOperation = in_array($entityName, ['máquina', 'operação']);

        $actionText = match ($actionId) {
            1 => 'criou ' . ($isEntityMachineOrOperation ? 'a' : 'o'),
            2 => 'atualizou ' . ($isEntityMachineOrOperation ? 'a' : 'o'),
            3 => 'deletou ' . ($isEntityMachineOrOperation ? 'a' : 'o'),
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

        $logService->store([
            'user_id' => $authenticatedUser->id,
            'action_id' => $actionId,
            'description' => $description,
            'table_id' => $tableId,
            'details' => $details
        ]);
    }
}