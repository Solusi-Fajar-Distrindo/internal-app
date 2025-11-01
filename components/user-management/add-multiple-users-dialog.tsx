"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Users, Loader2 } from "lucide-react"

interface AddMultipleUsersDialogProps {
  onAddMultipleUsers: (emails: string[]) => Promise<void>
}

export function AddMultipleUsersDialog({ onAddMultipleUsers }: AddMultipleUsersDialogProps) {
  const [open, setOpen] = useState(false)
  const [emails, setEmails] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Split emails by line break and filter out empty lines
    const emailArray = emails
      .split('\n')
      .map(email => email.trim())
      .filter(email => email.length > 0)
    
    if (emailArray.length === 0) {
      return
    }
    
    setIsSubmitting(true)

    try {
      await onAddMultipleUsers(emailArray)
      setEmails("")
      setOpen(false)
    } catch (error) {
      console.error('Error adding multiple users:', error)
      // You might want to show an error toast here
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="gap-2 cursor-pointer">
          <Users className="h-4 w-4" />
          Tambah Banyak Pengguna
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tambah Banyak Pengguna</DialogTitle>
            <DialogDescription>
              Tambahkan beberapa pengguna sekaligus dengan memasukkan email mereka.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="emails">Email Pengguna</Label>
              <Textarea
                id="emails"
                placeholder={`Masukkan email pengguna, satu email per baris contoh: 
user1@example.com 
user2@example.com 
user3@example.com`}
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                rows={8}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Masukkan setiap email pada baris terpisah. Password default untuk semua pengguna adalah <strong>12345678</strong>.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="cursor-pointer"
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button type="submit" className="cursor-pointer" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menambahkan...
                </>
              ) : (
                `Tambah ${emails.split('\n').filter(email => email.trim()).length} Pengguna`
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}