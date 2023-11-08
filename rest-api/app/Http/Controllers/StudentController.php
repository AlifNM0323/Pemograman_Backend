<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $student = Student::all();

            $data = [
                "message" => "Get All Users",
                "data" => $student
            ];

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "error", "error" => $th]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $input = [
                'nama' => $request->nama,
                'nim' => $request->nim,
                'email' => $request->email,
                'jurusan' => $request->jurusan
            ];

            $students = Student::create($input);

            $data = [
                'message' => 'Student is created successfully',
                'data' => $students
            ];

            return response()->json($data, 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "error"]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $data = Student::find($id);
            if ($data) {
                $result = [
                    'message' => "success get data",
                    'data' => $data
                ];
            }else{
                $result = [
                    'message' => 'failed to get data',
                    'data' => 'data not found'
                ];
            }
            return response()->json($result,200);
        } catch (\Throwable $th) {
            return response()->json(["message"=>"error","error"=>$th],500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $id = (int) $id;
        $input = [
            'nama' => $request->nama,
            'nim' => $request->nim,
            'email' => $request->email,
            'jurusan' => $request->jurusan
        ];
        $student = Student::find($id)->update($input);

        $data = [
            'message' => "Student is updated successfully",
            'data' => $student
        ];

        return response()->json($data,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $id = (int) $id;
        $student = Student::destroy($id);

        $data = [
            'message' => "deleted Student issss successfully",
            'data' => $student
        ];

        return response()->json($data,200);
    }
}
