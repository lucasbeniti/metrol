<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpsertOperationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:255',
            'item_id' => 'required|exists:items,id',
            'cost_center_id' => 'required|exists:cost_centers,id',
        ];
    }
}
