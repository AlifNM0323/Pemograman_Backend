<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Student extends Model
{
    use HasFactory;

    protected $table = 'students';

    protected $fillable = [
        'nama',
        'nim',
        'email',
        'jurusan',
        'created_at',
        'updated_at'
    ];
    
    protected $primaryKey = 'id';


    public function getStudents(){
        $students = DB::select("select * from students");
        return $students;
    }
}

