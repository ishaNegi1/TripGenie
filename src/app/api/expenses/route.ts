import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      trip_id,
      title,
      amount,
      category,
      paid_by,
    } = body;

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("expenses")
      .insert({
        trip_id,
        user_id: user.id,
        title,
        amount,
        category,
        paid_by,
      })
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to add expense",
      },
      { status: 500 }
    );
  }
}