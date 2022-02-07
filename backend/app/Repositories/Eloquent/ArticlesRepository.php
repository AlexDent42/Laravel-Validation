<?php

namespace App\Repositories\Eloquent;

use App\Models\Articles;
use App\Models\Users;
use App\Models\Categories;
use App\Models\Tags;

use App\Repositories\ArticlesRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class ArticlesRepository extends BaseRepository implements ArticlesRepositoryInterface
{
    public function __construct(Articles $model)
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
        $query->with('category');
        $query->with('tags');
        $query->with('images');

        if (isset($params['filter'])) {
            $filter = $params['filter'];

            if (isset($filter['title'])) {
                $query->where('title', 'like', '%'.$filter['title'].'%');
            }

            if (isset($filter['body'])) {
                $query->where('body', 'like', '%'.$filter['body'].'%');
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
            $articles = Articles::create([
                    'title' => $attributes['title'] ?? null
,
                    'body' => $attributes['body'] ?? null
,
                    'author' => $attributes['author'] ?? null
,
                    'category' => $attributes['category'] ?? null
,
                    'featured' => $attributes['featured'] ?? false

,
                    'created_by_user' => $currentUser->id
                ]);

            $tags = Tags::find($attributes['tags']);
            $articles->tags()->sync($tags);

            if (isset($attributes['images'])) {
                foreach ($attributes['images'] as &$item) {
                    if (isset($item['new'])) {
                        unset($item['new']);
                        $item['belongsTo_column'] = 'images';
                        $articles->images()->create($item);
                    }
                }
            }

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
            $articles = Articles::find($id);
            $articles->update([
                    'title' => $attributes['title'] ?? null
,
                    'body' => $attributes['body'] ?? null
,
                    'author' => $attributes['author'] ?? null
,
                    'category' => $attributes['category'] ?? null
,
                    'featured' => $attributes['featured'] ?? false

,
                    'updated_by_user' => $currentUser->id
                ]);

            $tags = Tags::find($attributes['tags']);
            $articles->tags()->sync($tags);

            if (isset($attributes['images'])) {
                foreach ($attributes['images'] as &$item) {
                    if (isset($item['new'])) {
                        unset($item['new']);
                        $item['belongsTo_column'] = 'images';
                        $articles->images()->create($item);
                    }
                }
            }

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
            ->with('category')
            ->with('tags')
            ->with('images')
            ->where('id', $id);

        return $query->get()[0];
    }

    public function findAllAutocomplete(array $params)
    {
        $query = $this->model->newModelQuery();

        $query->select('*', 'title as label');

        if (isset($params['query'])) {
            $query->where('title', 'like', '%'.$params['query'].'%');
        }

        if (isset($params['limit'])) {
            $query->limit($params['limit']);
        }

        $query->orderBy('title', 'ASC');

        return $query->get()
            ->map(fn($item) => ['id' => $item->id, 'label' => $item->label]);
    }
}

