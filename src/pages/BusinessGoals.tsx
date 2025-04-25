import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, PlusCircle, Clock } from 'lucide-react';
const BusinessGoals = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // Sample business goal events
  const events = [{
    date: new Date(2025, 3, 15),
    title: "Business Plan Review",
    time: "10:00 AM",
    status: "scheduled"
  }, {
    date: new Date(2025, 3, 22),
    title: "Marketing Strategy Session",
    time: "2:00 PM",
    status: "scheduled"
  }, {
    date: new Date(2025, 4, 5),
    title: "Financial Planning",
    time: "11:00 AM",
    status: "pending"
  }];

  // Function to highlight dates with events
  const isDayWithEvent = (day: Date) => {
    return events.some(event => event.date.getDate() === day.getDate() && event.date.getMonth() === day.getMonth() && event.date.getFullYear() === day.getFullYear());
  };
  return <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-4 mb-6">
          <h1 className="text-gray-900 font-normal text-2xl">Business Goals</h1>
          <p className="text-lg text-avaana-primary font-medium">
            You have $350 in credits. Book a Business Goal session now.
          </p>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-normal text-lg">Upcoming Business Goal Sessions</CardTitle>
            <Button className="bg-avaana-primary text-white hover:bg-avaana-secondary">
              <PlusCircle className="h-4 w-4 mr-2" />
              Book New Session
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" modifiers={{
                event: date => isDayWithEvent(date)
              }} modifiersClassNames={{
                event: "bg-avaana-primary/10 font-bold text-avaana-primary"
              }} />
              </div>
              <div>
                <h3 className="font-medium mb-4">Upcoming Sessions</h3>
                <div className="space-y-4">
                  {events.map((event, index) => <div key={index} className="flex items-start gap-3 p-3 border rounded-md">
                      <CalendarIcon className="h-5 w-5 text-avaana-primary mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{event.title}</h4>
                          {event.status === "scheduled" ? <Badge className="bg-green-100 text-green-800">Scheduled</Badge> : <Badge className="bg-amber-100 text-amber-800">Pending</Badge>}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>
                            {event.date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })} at {event.time}
                          </span>
                        </div>
                      </div>
                    </div>)}
                  
                  <Button variant="outline" className="w-full mt-2">
                    View All Sessions
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>;
};
export default BusinessGoals;