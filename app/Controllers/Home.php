<?php namespace App\Controllers;

class Home extends BaseController
{
	public function index()
	{
		$req_url = 'https://get.client-ip.com/lookup';
        $data = file_get_contents($req_url);
		return $this->response->setJSON(['status' => 201, 'data' => json_decode($data)]);
	}

	//--------------------------------------------------------------------

}
