<?php

namespace App\Http\Controllers;
use App\Models\Pasien;
// use App\Models\StatusPasien;
// use App\Models\StatusPasien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Exception;

class PasienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {

            // untuk filter menggunakan 
            // filter[nama]
            // filter[sort]
            // filter[order]

            // untuk paging menggunakan
            // page[limit]
            // page[number]
            
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

            $students = Pasien::query();
            $name = (isset($filter['nama'])) ? $filter['nama'] : NULL;
            if ($name != NULL) {
                $students = $students->where('nama',$name);
            }

            $students = $students->orderBy($sort,$order)->offset($offset)
                        ->limit($pageLimit)->get();

            // get total
            $studentTotal = Pasien::query();
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
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(),[
                'name' => "required|max:200",
                'phone' => "required|min:10",
                'address' => "required",
                'status' => "required|in:positif,sembuh,meninggal",
                'in_date_at'=> "nullable|date",
                'out_date_at'=> "nullable|date",
            ]);

            if($validator->fails()){
                // var_dump($validator->fails());
                foreach ($validator->errors()->messages() as $key => $value) {
                    return response()->json(["message"=>"failed Added Data","error"=>$value[0]]);       
                }
            }

            $input = [
                'name'=> $request->name,
                'phone'=> $request->phone,
                'address'=> $request->address,
                'status' => $request->status,
                'in_date_at'=> $request->in_date_at,
                'out_date_at'=> $request->out_date_at
            ];
    
            $students = Pasien::create($input);
    
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
     */
    public function show($id)
    {
        try {
            $data = Pasien::find($id);
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
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $id = (int) $id;
            $student = Pasien::find($id);
            $input = [
                'name' => $request->name ?? $student->name,
                'phone' => $request->phone ?? $student->phone,
                'address' => $request->address ?? $student->address,
                'status' => $request->status ?? $student->status,
                'in_date_at' => $request->in_date_at ?? $student->in_date_at,
                'out_date_at' => $request->out_date_at ?? $student->out_date_at
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
     */
    public function destroy( $id)
    {
        try {
            $id = (int) $id;
            $student = Pasien::find($id);
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
    

