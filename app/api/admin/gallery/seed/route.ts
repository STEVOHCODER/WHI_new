import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const existingPhotos = [
  { file: "/images/whi-photo-gallery/image1.jpg", title: "Community Outreach", caption: "WHI-SL outreach activity engaging with community members in Bo District" },
  { file: "/images/whi-photo-gallery/image2.jpg", title: "Health Education", caption: "Health education and awareness session for young people" },
  { file: "/images/whi-photo-gallery/image3.jpg", title: "Sports for Health", caption: "Sports activity used to promote public health messages in communities" },
  { file: "/images/whi-photo-gallery/image4.jpg", title: "Youth Engagement", caption: "Young people participating in WHI-SL community programs" },
  { file: "/images/whi-photo-gallery/image5.jpg", title: "Team Building", caption: "WHI-SL team and volunteers during a community event" },
  { file: "/images/whi-photo-gallery/image6.jpg", title: "Gender Empowerment", caption: "Women and girls empowerment session in Bo District" },
  { file: "/images/whi-photo-gallery/image7.jpg", title: "Advocacy Session", caption: "Human rights advocacy and awareness creation" },
  { file: "/images/whi-photo-gallery/image8.jpg", title: "Community Meeting", caption: "Community stakeholders meeting for programme planning" },
  { file: "/images/whi-photo-gallery/image9.jpg", title: "Outreach Event", caption: "Public outreach and sensitisation event in Bo City" },
];

/**
 * POST /api/admin/gallery/seed — seed existing gallery images into MongoDB
 */
export async function POST() {
  try {
    const db = await getDb();
    const collection = db.collection("gallery");

    let seeded = 0;
    let skipped = 0;

    for (const photo of existingPhotos) {
      const exists = await collection.findOne({ imageUrl: photo.file });
      if (exists) {
        skipped++;
        continue;
      }

      await collection.insertOne({
        _id: new ObjectId(),
        imageUrl: photo.file,
        title: photo.title,
        caption: photo.caption,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      seeded++;
    }

    return NextResponse.json({ ok: true, seeded, skipped, total: existingPhotos.length });
  } catch (error) {
    console.error("[api/admin/gallery/seed] error:", error);
    return NextResponse.json(
      { error: "Seed failed", details: (error as Error).message },
      { status: 500 },
    );
  }
}
