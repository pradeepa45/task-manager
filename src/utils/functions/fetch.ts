import { Task } from "@/types/common"
import { createClient } from "@/utils/supabase/client";

const itemsPerPage = 5;

const fetchSortFilterData = async (
  meta: {currentPage: number, totalPages: number, results: number},
  setLoading: any,
  setData: any,
  setMeta: any,
  setError: any,
  filterBy?: string,
  value?: string,
  sort?: string,
  customSize?: number
) => {
  const supabase = createClient();
  const start = (meta.currentPage - 1) * itemsPerPage;
  let end = start + itemsPerPage - 1;
  if(customSize) {
    end = start + customSize - 1;
  }
  try {
    setLoading(true);
    let response;
    if (filterBy && value && sort) {
      response = await supabase
        .from("todos")
        .select("*",{
          count: "exact",
        })
        .eq(filterBy, value)
        .range(start, end)
        .order(sort, { ascending: true });
    } else if (filterBy && value && !sort) {
      response = await supabase
        .from("todos")
        .select("*",{
          count: "exact",
        })
        .eq(filterBy, value)
        .range(start, end);
    } else if (!(filterBy && value) && sort) {
      response = await supabase
        .from("todos")
        .select("*",{
          count: "exact",
        })
        .range(start, end)
        .order(sort, { ascending: true });
    } else {
      response = await supabase
        .from("todos")
        .select("*",{
          count: "exact",
        })
        .range(start, end)
        .order("id", { ascending: false });
    }
    if (response?.data && response.count) {
      if(customSize) {
        setData((prevData:Task[]) => {
          return [...prevData,response.data]
        })
      }
      setData(response.data);
      setMeta({
        ...meta,
        results: response.count,
        currentPage: meta.currentPage,
        totalPages: Math.ceil(response?.count / itemsPerPage),
      })
    }
  } catch (error: any) {
    setError(error);
  } finally {
    setLoading(false);
  }
};

export default fetchSortFilterData;
