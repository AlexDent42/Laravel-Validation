<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\CommentsRepositoryInterface;

class CommentsController extends Controller
{
    protected CommentsRepositoryInterface $commentsRepository;
    protected Request $request;

    public function __construct(CommentsRepositoryInterface $commentsRepository, Request $request)
    {
        $this->commentsRepository = $commentsRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->commentsRepository->findAll($this->request->all());

        return response()->json($payload);
    }

    public function show($id)
    {
        $payload = $this->commentsRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->commentsRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->commentsRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->commentsRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->commentsRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

