import React, { useEffect, useState } from 'react';
import { useBookings } from '../../features/bookings/useBookings';
import { Spinner } from '../../components/Spinner';
import { Empty } from '../../components/Empty';
import { Table } from '../../components/Table';
import { BookingRow } from './BookingRow';

function BookingTable() {
  const { bookings, isLoading, error } = useBookings();
  
  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading bookings...</div>;
  if (!bookings || bookings.length === 0) return <Empty resource="bookings" />;

  return (
    <Table>
      <Table.Header>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>

      <Table.Body 
        data={bookings} 
        render={(booking) => (
          <BookingRow booking={booking} key={booking.id} />
        )}
      />
    </Table>
  );
}

export default BookingTable; 