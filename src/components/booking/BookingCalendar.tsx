
import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock } from 'lucide-react';

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", 
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

interface BookingCalendarProps {
  credits: number;
  expiryDate: string;
}

const BookingCalendar = ({ credits, expiryDate }: BookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Disable past dates and weekends
  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = date.getDay();
    return date < today || day === 0 || day === 6;
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBookSession = () => {
    if (selectedDate && selectedTime) {
      const formattedDate = format(selectedDate, 'MMMM do, yyyy');
      alert(`Session booked for ${formattedDate} at ${selectedTime}`);
      // Reset selections after booking
      setSelectedDate(undefined);
      setSelectedTime(null);
    }
  };

  return (
    <Card className="border-avaana-primary/20 mb-6">
      <CardHeader className="bg-avaana-primary/5 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-avaana-primary">Book a Business Goal Session with an Expert</CardTitle>
            <CardDescription className="mt-1 text-base">
              You have ${credits} in credits expiring on {expiryDate}
            </CardDescription>
          </div>
          <CalendarDays className="h-8 w-8 text-avaana-primary" />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-avaana-primary" />
              Select Date
            </h3>
            <div className="border rounded-lg p-1">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={disabledDays}
                fromDate={new Date()}
                toDate={addDays(new Date(), 60)}
                className="rounded-md"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-avaana-primary" />
              Select Time
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className={`${selectedTime === time ? 'bg-avaana-primary hover:bg-avaana-secondary' : ''} ${!selectedDate ? 'opacity-50 pointer-events-none' : ''}`}
                  onClick={() => handleTimeSelect(time)}
                  disabled={!selectedDate}
                >
                  {time}
                </Button>
              ))}
            </div>
            
            <div className="mt-6">
              <Button 
                className="w-full bg-avaana-primary hover:bg-avaana-secondary text-white"
                size="lg"
                disabled={!selectedDate || !selectedTime}
                onClick={handleBookSession}
              >
                Book Session
              </Button>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Session cost: 100 credits • You have {credits} credits remaining
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
