<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('metrology_calls', function (Blueprint $table) {
            $table->id();
            $table->foreignId('machine_id')->constrained('machines');
            $table->foreignId('operation_id')->constrained('operations');
            $table->foreignId('opened_by_user_id')->constrained('users');
            $table->foreignId('metrology_call_type_id')->constrained('metrology_call_types');
            $table->foreignId('closed_by_user_id')->nullable()->constrained('users');
            $table->foreignId('metrology_call_status_id')->constrained('metrology_call_statuses');
            $table->timestamp('received_at')->nullable();
            $table->timestamp('closed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('metrology_calls');
    }
};
