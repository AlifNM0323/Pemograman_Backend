<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\StatusPasien;

class Pasien extends Model
{
    use HasFactory;
    protected $table = 'pasiens';
    protected $fillable =
    [
        'name',
        'phone',
        'address',
        'status_id',
        'created_at', '
        updated_at'
    ];

    protected $primaryKey = 'id';
}
