"use client"

import { useState } from "react"
import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    description: "We're available 9 AM - 6 PM (GMT+6), Monday to Saturday",
    details: ["+880 1234-567890", "+880 1987-654321"],
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Get a response within 24 hours",
    details: ["support@friendstelecom.com", "hello@friendstelecom.com"],
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come to our main office",
    details: ["123 Tech Street, Gulshan, Dhaka 1212, Bangladesh"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "We're here to help",
    details: ["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: Closed"],
  },
]

const subjects = [
  "General Inquiry",
  "Product Support",
  "Order Issue",
  "Return & Refund",
  "Bulk Purchase",
  "Partnership",
  "Other",
]

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Form submitted:", formData)
      setSubmitSuccess(true)

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Get in Touch</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a question or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </section>

      {/* Contact Info Cards */}
      <section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{info.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{info.description}</p>
                  <div className="mt-3 space-y-1">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-xs font-medium">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section>
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {submitSuccess ? (
                <div className="rounded-lg bg-green-50 p-6 text-center">
                  <div className="mb-3 text-4xl">✓</div>
                  <h3 className="font-semibold text-green-900">Message Sent Successfully!</h3>
                  <p className="mt-2 text-sm text-green-800">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-2"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-2"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2"
                      placeholder="+880 1234567890"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Select value={formData.subject} onValueChange={handleSubjectChange}>
                      <SelectTrigger id="subject" className="mt-2">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subj) => (
                          <SelectItem key={subj} value={subj}>
                            {subj}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-2 min-h-32"
                      placeholder="Tell us how we can help..."
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formData.message.length}/1000
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gap-2"
                    size="lg"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <Send className="h-4 w-4" />}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">Still have questions?</h2>
        <p className="mt-2 text-muted-foreground">
          Check out our <a href="/faqs" className="text-primary hover:underline">FAQs</a> for quick answers
        </p>
      </section>
    </div>
  )
}
