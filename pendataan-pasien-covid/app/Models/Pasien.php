<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pasien extends Model
{
    use HasFactory;
    protected $table = 'pasiens';
    protected $fillable =
    [
        'name',
        'phone',
        'address',
        'status',
        'in_date_at',
        'out_date_at',
        'created_at', '
        updated_at'
    ];

    protected $primaryKey = 'id';
}
