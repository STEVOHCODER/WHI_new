import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Map of actual site images to their public paths and display info.
 * These are the images currently hardcoded in photo-assets.ts and used on the site.
 */
const siteImages = [
  { file: "/images/gallery/community-outreach.png", title: "Community Outreach", caption: "WHI-SL community outreach activity engaging with residents in Bo District" },
  { file: "/images/gallery/health-advocacy.png", title: "Health Advocacy", caption: "Community health education and sensitisation session for young people" },
  { file: "/images/gallery/sports1.png", title: "Sports for Health", caption: "Young people gathered for a community sports and health activity" },
  { file: "/images/gallery/sports2.png", title: "Mental Health Awareness", caption: "A sports session used to share mental health awareness messages" },
  { file: "/images/gallery/sports3.png", title: "Youth Outreach Event", caption: "Young people taking part in an outreach sports and entertainment event" },
  { file: "/images/gallery/team-image.png", title: "WHI Team", caption: "The WHI-SL team working together for community development" },
  { file: "/images/gallery/launch-crowd.jpg", title: "Launch Event Crowd", caption: "Community crowd at a WHI-SL outreach and celebration event" },
  { file: "/images/gallery/team-banner.jpg", title: "Team Banner", caption: "WHI-SL team banner at a public event in Bo City" },
  { file: "/images/gallery/outreach-speaker.jpg", title: "Outreach Speaker", caption: "Community outreach speaker addressing participants at an event" },
  { file: "/images/gallery/sport-match.jpg", title: "Sports Match", caption: "Community sports match used for health awareness campaigns" },
  { file: "/images/gallery/office-desk.jpg", title: "Office Workspace", caption: "WHI-SL office workspace where planning and coordination happens" },
  { file: "/images/gallery/office-admin.jpg", title: "Admin Team", caption: "WHI-SL administrative team supporting daily operations" },
  { file: "/images/gallery/office-room.jpg", title: "Meeting Room", caption: "WHI-SL meeting room for team discussions and partner engagements" },
];

/**
 * POST /api/admin/gallery/seed — seed actual site images into MongoDB
 */
export async function POST() {
  try {
    const db = await getDb();
    const collection = db.collection("gallery");

    let seeded = 0;
    let skipped = 0;

    for (const img of siteImages) {
      const exists = await collection.findOne({ imageUrl: img.file });
      if (exists) {
        skipped++;
        continue;
      }

      await collection.insertOne({
        _id: new ObjectId(),
        imageUrl: img.file,
        title: img.title,
        caption: img.caption,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      seeded++;
    }

    return NextResponse.json({ ok: true, seeded, skipped, total: siteImages.length });
  } catch (error) {
    console.error("[api/admin/gallery/seed] error:", error);
    return NextResponse.json(
      { error: "Seed failed", details: (error as Error).message },
      { status: 500 },
    );
  }
}
