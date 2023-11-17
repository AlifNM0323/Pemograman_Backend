<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

          
            
            foreach ($request->all() as $key => $value) {
                $$key = $value;
            }

            $order = (isset($filter['order'])) ? $filter['order'] : NULL;
            if ($order == NULL) {
                $order = 'asc';
            }
            $sort = (isset($filter['sort'])) ? $filter['sort'] : NULL;
            if ($sort == NULL) {
                $sort = 'nama';
            }
            $pageLimit = (isset($page['limit'])) ? $page['limit'] : 5;
            $pageNumber = (isset($page['number'])) ? $page['number'] : 1;
            $offset = ($pageNumber - 1) * $pageLimit;
            $pages = [];
            $pages['pageLimit'] = (int) $pageLimit;
            $pages['pageNumber'] = (int) $pageNumber;

            $students = Student::query();
            $name = (isset($filter['nama'])) ? $filter['nama'] : NULL;
            if ($name != NULL) {
                $students = $students->where('nama',$name);
            }

            $students = $students->orderBy($sort,$order)->offset($offset)
                        ->limit($pageLimit)->get();

            // get total
            $studentTotal = Student::query();
            $name = (isset($filter['nama'])) ? $filter['nama'] : NULL;
            if ($name != NULL) {
                $studentTotal = $studentTotal->where('nama',$name);
            }

            $pageLimit = (isset($page['limit'])) ? $page['limit'] : 5;
            $pageNumber = (isset($page['number'])) ? $page['number'] : 1;
            $offset = ($pageNumber - 1) * $pageLimit;
            
            $studentTotal = $studentTotal->count();;
            
            $pages['totalData'] = $studentTotal;
            $totalPage = ceil($studentTotal / $pageLimit);
            $pages['totalPage'] = $totalPage;
            
            $data = [];
            $data['pages'] = $pages;
            $data['table'] = $students;
            
            if (count($students) > 0) {
                $result = [
                    "message" => "Success Get All Users",
                    "data" => $data
                ];
            }else{
                $result = [
                    'message' => "data not found"
                ];
            }
    
            return response()->json($result,200);
            
        } catch (\Throwable $th) {
           return response()->json(["message"=>"error"],500);
        }
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(),[
                'nama' => "required|max:200",
                'nim' => "numeric|required",
                'email' => "email|required",
                'jurusan' => "required"
            ]);

            if($validator->fails()){
                // var_dump($validator->fails());
                foreach ($validator->errors()->messages() as $key => $value) {
                    return response()->json(["message"=>"failed Added Data","error"=>$value[0]]);       
                }
            }

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
    
            return response()->json($data,201);
        } catch (\Throwable $th) {
            return response()->json(["message"=>"error",'error'=>$th],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show( $id)
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
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $id = (int) $id;
            $student = Student::find($id);
            $input = [
                'nama' => $request->nama ?? $student->nama,
                'nim' => $request->nim ?? $student->nim,
                'email' => $request->email ?? $student->email,
                'jurusan' => $request->jurusan ?? $student->jurusan
            ];
            if ($student) {  
                $student->update($input);
                $result = [
                    'message' => "Student is updated successfully",
                    'data' => $student
                ];
            }else{
                $result = [
                    'message' => 'failed to updated student',
                    'data' => 'data not found'
                ];
            }
            return response()->json($result,200);
        } catch (\Throwable $th) {
            return response()->json(["message"=>"error","error"=>$th],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $id = (int) $id;
            $student = Student::find($id);
            if ($student) {
                $student->delete();
                $result = [
                    'message' => "error",
                    'data' => "student is not found"
                ];
            }else{
                
                $result = [
                    'message' => "deleted Student issss successfully",
                    'data' => $student
                ];
            };
            
            return response()->json($result,200);
            
        } catch (\Throwable $th) {
            return response()->json(["message"=>"error","error"=>$th],500);
        }

    }
}