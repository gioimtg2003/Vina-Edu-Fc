import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { GoogleAuthService } from "../services/googleAuth";

export const createGoogleCalendarTools = (clientEmail: string, privateKey: string, calendarId: string) => {
    const authService = new GoogleAuthService(clientEmail, privateKey);

    const checkAvailabilityTool = tool(
        async ({ date }) => {
            try {
                const token = await authService.getAccessToken(['https://www.googleapis.com/auth/calendar.readonly']);
                const timeMin = new Date(date).toISOString();
                const timeMax = new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000).toISOString();

                const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true`;
                const response = await fetch(url, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) throw new Error("Failed to fetch calendar");
                const data = await response.json() as any;

                const events = data.items || [];
                if (events.length === 0) return "Không có sự kiện nào được đặt cho ngày này. Bạn có thể đặt lịch cho khách hàng.";

                return `Tìm thấy ${events.length} slot trống. Thời gian: ${events.map((e: any) => e.start.dateTime || e.start.date).join(', ')}`;
            } catch (e: any) {
                return `Error checking availability: ${e.message}`;
            }
        },
        {
            name: "check_calendar_availability",
            description: "Kiểm tra lịch để xem có slot trống cho ngày hoặc thời gian nhất định.",
            schema: z.object({
                date: z.string().describe("The date to check, in YYYY-MM-DD format.")
            })
        }
    );

    const bookAppointmentTool = tool(
        async ({ datetime, description, customerName }) => {
            try {
                const token = await authService.getAccessToken(['https://www.googleapis.com/auth/calendar.events']);
                const startTime = new Date(datetime);
                const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration

                const event = {
                    summary: `Consultation: ${customerName}`,
                    description,
                    start: { dateTime: startTime.toISOString() },
                    end: { dateTime: endTime.toISOString() }
                };

                const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(event)
                });

                if (!response.ok) throw new Error("Failed to insert event");
                return `Đặt lịch thành công cho ${customerName} vào lúc ${startTime.toISOString()}.`;
            } catch (e: any) {
                return `Lỗi khi đặt lịch: ${e.message}`;
            }
        },
        {
            name: "book_appointment",
            description: "Tạo sự kiện trong lịch để đặt lịch cho khách hàng.",
            schema: z.object({
                datetime: z.string().describe("ISO 8601 string of start time."),
                description: z.string().describe("Chi tiết về cuộc tư vấn."),
                customerName: z.string().describe("Tên khách hàng.")
            })
        }
    );

    return [checkAvailabilityTool, bookAppointmentTool];
};
