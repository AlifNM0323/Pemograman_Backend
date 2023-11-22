<?php

namespace App\Http\Controllers;
use App\Models\Pasien;
use App\Models\StatusPasien;
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
            $validator = Validator::make($request->all(), [
                'filter.status' => 'nullable|in:positif,negatif,meninggal',
                'filter.sort' => 'nullable|in:tanggal_masuk,tanggal_keluar,address',
                'filter.order' => 'nullable|in:asc,desc'
            ],[
                'filter.status.in' => 'The status field must be one of: positif, negatif, meninggal',
                'filter.sort.in' => 'The sort field must be one of: tangal_masuk,tanggal_keluar,address',
                'filter.order.in' => 'The sort field must be one of: asc,desc'
            ]);

            if($validator->fails()){
                // var_dump($validator->fails());
                foreach ($validator->errors()->messages() as $key => $value) {
                    return response()->json(["message"=>"failed Get Data","error"=>$value[0]],400);       
                }
            }
            
            foreach ($request->all() as $key => $value) {
                $$key = $value;
            }

            $order = (isset($filter['order'])) ? $filter['order'] : NULL;
            if ($order == NULL) {
                $order = 'desc';
            }
            switch ($order) {
                case 'asc':
                    $order = 'asc';
                    break;
                case 'desc':
                    $order = 'desc';
                    break;
                default:
                    throw new \Exception("The order field must be one of: asc,desc", 400);
                    break;
            }

            $sort = (isset($filter['sort'])) ? $filter['sort'] : NULL;
            if ($sort == NULL) {
                $sort = 'tanggal_masuk';
            }

            $validSortFields = ['tanggal_masuk', 'tanggal_keluar', 'address'];

            if (!in_array($sort, $validSortFields)) {
                throw new \Exception("The sort field must be one of: " . implode(',', $validSortFields), 400);
            }

            switch ($sort) {
                case 'tanggal_masuk':
                    $sort = 'in_date_at';
                    break;
                case 'tanggal_keluar':
                    $sort = 'out_date_at';
                    break;
                case 'address':
                    $sort = 'address';
                    break;
                default:
                    throw new \Exception("The sort field must be one of: tanggal_masuk,tanggal_keluar,address", 400);
                    break;
            }


            $pageLimit = (isset($page['limit'])) ? $page['limit'] : 5;
            $pageNumber = (isset($page['number'])) ? $page['number'] : 1;
            $offset = ($pageNumber - 1) * $pageLimit;
            $pages = [];
            $pages['pageLimit'] = (int) $pageLimit;
            $pages['pageNumber'] = (int) $pageNumber;

            
            $patients = Pasien::leftJoin('status_patients','patients.status_id','=','status_patients.id');
            $name = (isset($filter['name'])) ? $filter['name'] : NULL;
            if ($name != NULL) {
                $patients = $patients->where('name','LIKE','%'.$name.'%');
            }

            $address = (isset($filter['address'])) ? $filter['address'] : NULL;
            if ($address != NULL) {
                $patients = $patients->where('address','LIKE','%'.$address.'%');
            }

            $status = (isset($filter['status'])) ? $filter['status'] : NULL;
            if ($status != NULL) {
                $patients = $patients->where('status_patients.status','LIKE','%'.$status.'%');
            }

            $patients = $patients->orderBy($sort,$order)->offset($offset)
                        ->limit($pageLimit)->get();
            
            $patientTotal = Pasien::leftJoin('status_patients','patients.status_id','=','status_patients.id');
            if ($name != NULL) {
                $patientTotal = $patientTotal->where('name','LIKE','%'.$name.'%');
            }

            if ($address != NULL) {
                $patientTotal = $patientTotal->where('address','LIKE','%'.$address.'%');
            }

            if ($status != NULL) {
                $patientTotal = $patientTotal->where('status_patients.status','LIKE','%'.$status.'%');
            }

            $pageLimit = (isset($page['limit'])) ? $page['limit'] : 5;
            $pageNumber = (isset($page['number'])) ? $page['number'] : 1;
            $offset = ($pageNumber - 1) * $pageLimit;
            
            $patientTotal = $patientTotal->count();;
            
            $pages['totalData'] = $patientTotal;
            $totalPage = ceil($patientTotal / $pageLimit);
            $pages['totalPage'] = $totalPage;
            
            $data = [];
            $data['pages'] = $pages;
            $data['table'] = $patients;
            
            if ($patientTotal > 0) {
                $result = [
                    "message" => "Success Get All Data Pasien",
                    "data" => $data
                ];
            }else{
                $result = [
                    'message' => "data not found"
                ];
            }
    
            return response()->json($result,200);
            
        } catch (\Exception $e) {
           return response()->json(["message"=>"error","error"=>$e->getMessage()],500);
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
                'status' => "required|in:positif,negatif,meninggal",
                'in_date_at'=> "nullable|date",
                'out_date_at'=> "nullable|date",
            ],[
                'status.in' => 'The status field must be one of: positif, negatif, meninggal.'
            ]);

            if($validator->fails()){
                foreach ($validator->errors()->messages() as $key => $value) {
                    return response()->json(["message"=>"failed Added Data","error"=>$value[0]],400);       
                }
            }

            if (!isset($request->in_date_at)) {
                $in_date_at = date('Y-m-d');
            }else{
                $in_date_at = new \DateTime($request->in_date_at);
                $in_date_at = $in_date_at->format('Y-m-d');
            }

            if (!isset($request->out_date_at)) {
                $out_date_at = NULL;
            }else{
                $out_date_at = new \DateTime($request->out_date_at);
                $out_date_at = $out_date_at->format('Y-m-d');
            }


            $inputStatusPasien = [
                'status' => $request->status,
                'in_date_at' => $in_date_at,
                'out_date_at'=> $out_date_at
            ];

            // var_dump($inputStatusPasien);
            // die;
    
            $StatusPasien = StatusPasien::create($inputStatusPasien);

            $inputPatient = [
                'name'=> $request->name,
                'phone'=> $request->phone,
                'address'=> $request->address,
                'status_id'=> $StatusPasien->id
            ];
            $patient = Pasien::create($inputPatient);
    
            $data = [
                'message' => 'Pasien is created successfully'
            ];
    
            return response()->json($data,201);
        } catch (\Throwable $th) {
            return response()->json(["message"=>"error","error"=>$th],500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $findDataPatient = Pasien::leftJoin('status_patients','patients.status_id','=','status_patients.id')->where('patients.id',$id)->first();
            if ($findDataPatient == NULL) {
                return response()->json(['message'=>'data not found'],404);
            }

            $data = [
                'message'=>'success get Data',
                'data'=>$findDataPatient
            ];
            return response()->json($data,200);
        } catch (\Exception $e) {
            return response()->json(["message"=>"error","error"=>$e->getMessage()],500);
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
            // Validasi input
            $validator = Validator::make($request->all(), [
                'name' => 'max:200',
                'phone' => 'min:10',
                'status' => 'nullable|in:positif,negatif,meninggal'
            ],[
                'status.in' => 'The status field must be one of: positif, negatif, meninggal.'
            ]);

            if($validator->fails()){
                // var_dump($validator->fails());
                foreach ($validator->errors()->messages() as $key => $value) {
                    return response()->json(["message"=>"failed Added Data","error"=>$value[0]],400);       
                }
            }

            $findDataPatient = Pasien::find($id);
            if ($findDataPatient == null) {
                return response()->json(['message'=>'data not found'],404);
            }
            $findDataStatusPatient = StatusPasien::find($findDataPatient->id);

            if (!isset($request->in_date_at)) {
                $in_date_at = $findDataStatusPatient->in_date_at;
            }else{
                $in_date_at = new \DateTime($request->in_date_at);
                $in_date_at = $in_date_at->format('Y-m-d');
            }

            if (!isset($request->out_date_at)) {
                $out_date_at = $findDataStatusPatient->out_date;
            }else{
                $out_date_at = new \DateTime($request->out_date_at);
                $out_date_at = $out_date_at->format('Y-m-d');
            }


            $inputStatusPatient = [
                'status' => (isset($request->status)) ? $request->status : $findDataStatusPatient->status,
                'in_date_at' => $in_date_at,
                'out_date_at'=> $out_date_at
            ];

    
            $statusPatient = StatusPasien::where('id',$findDataStatusPatient->status_id)->update($inputStatusPatient);

            $inputPatient = [
                'name'=> (isset($request->name)) ? $request->name : $findDataPatient->name,
                'phone'=> (isset($request->phone)) ? $request->phone : $findDataPatient->phone,
                'address'=> (isset($request->address)) ? $request->address : $findDataPatient->address,
                'status_id'=> $findDataPatient->status_id
            ];
            $patient = Pasien::where('id',$findDataPatient->id)->update($inputPatient);
    
            $data = [
                'message' => 'Pasien is updated successfully'
            ];
    
            return response()->json($data,201);
        } catch (\Exception $e) {
            return response()->json(["message"=>"error","error"=>$e->getMessage()],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        try {
            $findData = Pasien::find($id);
            if ($findData == NULL) {
                return response()->json(["message"=>"data not found"],404);
            }
            StatusPasien::where('id',$findData->status_id)->delete();
            Pasien::where('id',$findData->id)->delete();
            
            $data = [
                'message' => 'Pasien is deleted successfully'
            ];
    
            return response()->json($data,200);
        } catch (\Exception $e) {
            return response()->json(["message"=>"error","error"=>$e->getMessage()],500);
        }
    }
    }

