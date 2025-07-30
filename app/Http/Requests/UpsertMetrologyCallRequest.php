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
            'machine_id' => 'required|exists:machines,id',
            'operation_id' => 'required|exists:operations,id',
            'metrology_call_type_id' => 'required|exists:metrology_call_types,id'
        ];
    }
}
