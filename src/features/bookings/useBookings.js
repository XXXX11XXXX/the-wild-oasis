import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { useQueryClient } from "@tanstack/react-query";

export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const filterValue = searchParams.get('status');
    const sortByRaw = searchParams.get('sortBy') || 'startDate-asc';
    const [field, direction] = sortByRaw.split('-');
    
    const filter = !filterValue || filterValue === 'all' 
      ? null 
      : { field: 'status', value: filterValue };
      
    const sortBy = { field, direction };
    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

    const {
        isLoading,
        data: {data: bookings, count} = {},
        error,
    } = useQuery({
        queryKey: ['bookings', filter, sortBy, page, PAGE_SIZE],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });
    if(page < Math.ceil(count / PAGE_SIZE)) {
        queryClient.prefetchQuery({ queryKey: ['bookings', filter, sortBy, page + 1, PAGE_SIZE],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        });
    }
    if(page > 1) {
        queryClient.prefetchQuery({ queryKey: ['bookings', filter, sortBy, page - 1, PAGE_SIZE],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        });
    }
    return { isLoading, bookings, count, error, PAGE_SIZE };
}