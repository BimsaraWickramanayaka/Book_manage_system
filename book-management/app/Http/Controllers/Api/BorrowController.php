<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\BorrowRecord;
use App\Models\Book;
use App\Http\Requests\BorrowRequest;
use App\Http\Requests\ReturnRequest;
use Illuminate\Http\Request;
use Carbon\Carbon;

class BorrowController extends Controller
{
    public function borrow(BorrowRequest $request)
    {
        $data = $request->validated();
        $book = Book::findOrFail($data['book_id']);

        if ($book->stock <= 0) {
            return response()->json(['message' => 'Out of stock'], 400);
        }

        \DB::transaction(function() use ($book, $data, &$borrowRecord) {
            $book->decrement('stock', 1);
            $borrowRecord = BorrowRecord::create([
                'user_id' => $data['user_id'],
                'book_id' => $data['book_id'],
                'borrowed_at' => Carbon::now(),
                'status' => 'borrowed'
            ]);
        });

        return response()->json($borrowRecord->load('book','user'), 201);
    }

    public function returnBook(ReturnRequest $request)
    {
        $data = $request->validated();
        $record = BorrowRecord::findOrFail($data['borrow_record_id']);

        if ($record->returned_at) {
            return response()->json(['message'=>'Already returned'], 400);
        }

        \DB::transaction(function() use ($record, &$updated) {
            $record->returned_at = Carbon::now();
            $record->status = 'returned';
            $record->save();

            $book = $record->book;
            $book->increment('stock', 1);
            $updated = $record;
        });

        return response()->json($updated->load('book','user'));
    }

    public function index(Request $request)
    {
        // optionally filter by user or book
        $query = BorrowRecord::with('book','user')->orderBy('borrowed_at','desc');
        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }
        return response()->json($query->get());
    }
}
