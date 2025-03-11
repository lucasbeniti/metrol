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
            $table->string('item_name');
            $table->foreignId('machine_id')->constrained();
            $table->foreignId('operation_id')->constrained();
            $table->enum('type', ['setup', 'production', 'adjust']);
            $table->foreignId('user_id')->nullable()->constrained();
            $table->enum('status', ['ok', 'nok', 'waiting_receive', 'waiting_measurement'])->default('waiting_receive');
            $table->timestamp('closed_at');
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
