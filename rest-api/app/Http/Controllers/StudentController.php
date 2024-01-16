<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        try {
            // ...
    
            $studentsQuery = Student::query(); // Rename the variable to $studentsQuery
    
            $name = (isset($filter['nama'])) ? $filter['nama'] : NULL;
            if ($name != NULL) {
                $studentsQuery = $studentsQuery->where('nama', $name);
            }
    
            // Initialize $sort and $order before using them
            $sort = (isset($filter['sort'])) ? $filter['sort'] : 'nama';
            $order = (isset($filter['order'])) ? $filter['order'] : 'asc';
    
            // Initialize $pageNumber and $pageLimit before using them
            $pageNumber = (isset($page['number'])) ? $page['number'] : 1;
            $pageLimit = (isset($page['limit'])) ? $page['limit'] : 5;
    
            // Initialize $offset before using it
            $offset = ($pageNumber - 1) * $pageLimit;
    
            $students = $studentsQuery->orderBy($sort, $order)
                ->offset($offset)
                ->limit($pageLimit)
                ->get();
    
            // ...
    
            // Initialize $pages before using it
            $pages = [];
            $pages['pageLimit'] = (int) $pageLimit;
            $pages['pageNumber'] = (int) $pageNumber;
    
            $studentTotal = Student::query();
            $name = (isset($filter['nama'])) ? $filter['nama'] : NULL;
            if ($name != NULL) {
                $studentTotal = $studentTotal->where('nama', $name);
            }
    
            $studentTotal = $studentTotal->count();
    
            $pages['totalData'] = $studentTotal;
            $totalPage = ceil($studentTotal / $pageLimit);
            $pages['totalPage'] = $totalPage;
    
            $data = [];
            $data['pages'] = $pages;
            $data['table'] = $students;
    
            $result = count($students) > 0
                ? ["message" => "Success Get All Users", "data" => $data]
                : ['message' => "data not found"];
    
            return response()->json($result, 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "error"], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nama' => "required|max:200",
                'nim' => "numeric|required",
                'email' => "email|required",
                'jurusan' => "required"
            ]);

            if ($validator->fails()) {
                $errors = $validator->errors()->messages();
                return response()->json(["message" => "failed Added Data", "error" => $errors], 422);
            }

            $input = [
                'nama' => $request->input('nama'),
                'nim' => $request->input('nim'),
                'email' => $request->input('email'),
                'jurusan' => $request->input('jurusan')
            ];

            $student = Student::create($input);

            $data = [
                'message' => 'Student is created successfully',
                'data' => $student
            ];

            return response()->json($data, 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "error", 'error' => $th], 500);
        }
    }

    public function show($id)
    {
        try {
            $data = Student::find($id);

            $result = $data
                ? ['message' => "success get data", 'data' => $data]
                : ['message' => 'failed to get data', 'data' => 'data not found'];

            return response()->json($result, $data ? 200 : 404);
        } catch (\Throwable $th) {
            return response()->json(["message" => "error", "error" => $th], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $id = (int)$id;
            $student = Student::find($id);

            if (!$student) {
                return response()->json(['message' => 'failed to update student', 'data' => 'data not found'], 404);
            }

            $input = [
                'nama' => $request->input('nama', $student->nama),
                'nim' => $request->input('nim', $student->nim),
                'email' => $request->input('email', $student->email),
                'jurusan' => $request->input('jurusan', $student->jurusan)
            ];

            $student->update($input);

            $result = [
                'message' => "Student is updated successfully",
                'data' => $student
            ];

            return response()->json($result, 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "error", "error" => $th], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $id = (int)$id;
            $student = Student::find($id);

            if (!$student) {
                return response()->json(['message' => 'Student not found', 'data' => null], 404);
            }

            $student->delete();

            $result = [
                'message' => "Deleted Student successfully",
                'data' => $student
            ];

            return response()->json($result, 200);

        } catch (\Throwable $th) {
            return response()->json(["message" => "error", "error" => $th], 500);
        }
    }
}
