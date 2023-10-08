'use client'

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import CopyButton from "./CopyButton";
import { z } from "zod";
import { createRoomSchema } from "@/lib/validations/createRoomSchema";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";

interface CreateRoomFormProps {
  roomId: string;
}

type CreatRoomForm = z.infer<typeof createRoomSchema>;

export default function CreateRoomForm ({roomId} : CreateRoomFormProps) {
    
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<CreatRoomForm>({
      resolver: zodResolver(createRoomSchema),
      defaultValues: {
        username: "",
      },
    });
    
    return (
    <Form {...form}>
      <form className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-foreground'>Username</FormLabel>
              <FormControl>
                <Input placeholder='johndoe' {...field} />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />

        <div>
          <p className='mb-2 text-sm font-medium'>Room ID</p>

          <div className='flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground'>
            <span>{roomId}</span>
            <CopyButton value={roomId} />
          </div>
        </div>

        <Button type='submit' className='mt-2 w-full'>
          {isLoading ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Create a Room'}
        </Button>
      </form>
    </Form>
  )
}