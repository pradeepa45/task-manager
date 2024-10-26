import { Task } from "@/types/common"
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function taskUpdateSubscriber(data: Task[], setData: any, setLoading: any, channelName:string) {
  supabase
      .channel(channelName)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'todos' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setLoading(true)
          if(data) {
            const updatedPage = [ ...data.slice(0,data.length-1)]
            const updatedData = [payload.new as Task, ...updatedPage]
            setData(updatedData);
          }
          else {
            setData([payload.new as Task])
          }
          setLoading(false)
        } else if (payload.eventType === 'DELETE') {
          setLoading(true)
          setData((taskList:Task[]) =>
            taskList
              ? taskList?.filter((item) => item.id !== payload.old.id)
              : []
          );
          setLoading(false)
        }
      })
      .subscribe();
}