<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpsertMetrologyCallRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'item_name' => 'required|string|max:255',
            'machine_id' => 'required|exists:machines,id',
            'operation_id' => 'required|exists:operations,id',
            'type' => 'required|in:setup,production,adjust'
        ];
    }
}
