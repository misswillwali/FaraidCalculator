// File: components/EmailResults.tsx
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { sendEmailAPI } from '@/lib/email-service'

interface EmailResultsProps {
  heirs: Heir[];
  shares: {[key: string]: { amount: number, fraction: string }};
  assets: number;
}

export function EmailResults({ heirs, shares, assets }: EmailResultsProps) {
  const [email, setEmail] = useState<string>('')

  const sendEmail = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter an email address.",
        variant: "destructive",
      })
      return
    }

    const emailContent = `
      Faraid Calculation Results:
      
      Total Assets: RM ${assets}
      
      Heirs and their shares:
      ${heirs.map(heir => `${heir.count} ${heir.relationship}(s): ${shares[heir.id].fraction} (RM ${shares[heir.id].amount.toFixed(2)})`).join('\n')}
    `

    try {
      await sendEmailAPI({
        to: email,
        subject: 'Faraid Calculation Results',
        body: emailContent,
      })
      
      toast({
        title: "Email Sent",
        description: "The Faraid calculation results have been sent to your email.",
      })
    } catch (error) {
      console.error('Failed to send email:', error)
      toast({
        title: "Error",
        description: "Failed to send email. Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Results</CardTitle>
        <CardDescription>Send the calculation results to your email</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <Button onClick={sendEmail}>Send Email</Button>
        </div>
      </CardContent>
    </Card>
  )
}
