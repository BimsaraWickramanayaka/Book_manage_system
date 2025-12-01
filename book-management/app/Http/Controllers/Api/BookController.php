<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\BookCategory;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $query = Book::with('category');

        if ($request->has('category_id')) {
            $query->where('book_category_id', $request->category_id);
        }

        $books = $query->orderBy('title')->get()->map(function($b){
            return [
                'id'=>$b->id,
                'title'=>$b->title,
                'author'=>$b->author,
                'price'=>number_format($b->price,2,'.',''),
                'stock'=>$b->stock,
                'category'=> $b->category ? $b->category->name : null,
                'out_of_stock' => $b->stock <= 0
            ];
        });

        return response()->json($books);
    }

    public function store(StoreBookRequest $request)
    {
        $book = Book::create($request->validated());
        return response()->json($book->load('category'), 201);
    }

    public function show($id)
    {
        $book = Book::with('category')->findOrFail($id);
        return response()->json($book);
    }

    public function update(UpdateBookRequest $request, $id)
    {
        $book = Book::findOrFail($id);
        $book->update($request->validated());
        return response()->json($book->load('category'));
    }

    public function destroy($id)
    {
        $book = Book::findOrFail($id);
        $book->delete();
        return response()->json(['message'=>'Deleted'], 200);
    }
}
