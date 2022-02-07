<?php

namespace App\Repositories\Eloquent;

use App\Models\Comments;
use App\Models\Users;
use App\Models\Articles;

use App\Repositories\CommentsRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class CommentsRepository extends BaseRepository implements CommentsRepositoryInterface
{
    public function __construct(Comments $model)
    {
        parent::__construct($model);
    }

    public function findAll($params) : array
    {
        $limit = 0;
        $offset = 0;
        $orderBy = null;

        $query = $this->model->newModelQuery();
        //$query->select("*", "product as prod_id");

        $query->with('author');
        $query->with('article');

        if (isset($params['filter'])) {
            $filter = $params['filter'];

            if (isset($filter['text'])) {
                $query->where('text', 'like', '%'.$filter['text'].'%');
            }

            if (isset($filter['active'])) {
                $query->where('active', $params['active']);
            }

            if (isset($filter['createdAtRange'])) {
                [$start, $end] = $filter['createdAtRange'];

                if (!empty($start)) {
                    $query->where('created_at', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('created_at', '<=', $end);
                }
            }
        }

        if ($limit) {
            $query->limit($limit);
        }

        $rows = $query->get();

        return [
            'rows' => $rows->toArray(),
            'count' => $rows->count(),
        ];
    }

    public function create(array $attributes, $currentUser)
    {
        try {
            $attributes = $attributes['data'];
            DB::beginTransaction();
            $attributes['created_by_user'] = $currentUser->id;
            $comments = Comments::create([
                    'text' => $attributes['text'] ?? null
,
                    'author' => $attributes['author'] ?? null
,
                    'article' => $attributes['article'] ?? null
,
                    'moderated' => $attributes['moderated'] ?? false

,
                    'created_by_user' => $currentUser->id
                ]);

            DB::commit();

            return [];
        } catch (Exception $exception) {
            DB::rollback();
        }
    }

    public function update($id, array $attributes, $currentUser)
    {
        try {
            $attributes = $attributes['data'];
            DB::beginTransaction();
            $comments = Comments::find($id);
            $comments->update([
                    'text' => $attributes['text'] ?? null
,
                    'author' => $attributes['author'] ?? null
,
                    'article' => $attributes['article'] ?? null
,
                    'moderated' => $attributes['moderated'] ?? false

,
                    'updated_by_user' => $currentUser->id
                ]);

            DB::commit();

            return [];
        } catch (Exception $exception) {
            DB::rollback();
        }
    }

    public function destroy($id)
    {
        return $this->model->destroy($id);
    }

    public function findById($id)
    {
        $query = $this->model->newModelQuery();

        $query
            ->with('author')
            ->with('article')
            ->where('id', $id);

        return $query->get()[0];
    }

    public function findAllAutocomplete(array $params)
    {
        $query = $this->model->newModelQuery();

        $query->select('*', 'text as label');

        if (isset($params['query'])) {
            $query->where('text', 'like', '%'.$params['query'].'%');
        }

        if (isset($params['limit'])) {
            $query->limit($params['limit']);
        }

        $query->orderBy('text', 'ASC');

        return $query->get()
            ->map(fn($item) => ['id' => $item->id, 'label' => $item->label]);
    }
}

