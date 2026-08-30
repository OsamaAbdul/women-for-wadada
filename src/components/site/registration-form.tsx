import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { gooeyToast } from "goey-toast";
import confetti from "canvas-confetti";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import locationData from "@/data/nasarawa-locations.json";

const formSchema = z.object({
  fullname: z.string().min(2, "Full name must be at least 2 characters"),
  gender: z.string(),
  phone: z.string().regex(/^\d{11}$/, "Phone number must be exactly 11 digits"),
  age: z.coerce.number().min(18, "You must be at least 18 years old").max(40, "You must be at most 40 years old"),
  lga: z.string().min(1, "LGA is required"),
  ward: z.string().min(1, "Ward is required"),
  pollingUnit: z.string().min(1, "Polling Unit is required"),
  votersCardNumber: z.string().regex(/^\d{19}$/, "Voter's Card Number must be exactly 19 digits"),
  occupation: z.string().min(1, "Occupation is required"),
  otherOccupation: z.string().optional(),
  votersCardFile: z.any().optional(),
  pictureFile: z.any().optional(),
}).refine(data => {
  if (data.occupation === "Other" && !data.otherOccupation) {
    return false;
  }
  return true;
}, {
  message: "Please specify your occupation",
  path: ["otherOccupation"]
});

const occupations = [
  "Student",
  "Civil Servant",
  "Entrepreneur",
  "Artisan",
  "Farmer",
  "Unemployed",
  "Other"
];

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      gender: "Female",
      phone: "",
      age: "" as unknown as number,
      lga: "",
      ward: "",
      pollingUnit: "",
      votersCardNumber: "",
      occupation: "",
      otherOccupation: "",
      votersCardFile: undefined,
      pictureFile: undefined,
    },
  });

  const watchLga = form.watch("lga");
  const watchWard = form.watch("ward");
  const watchOccupation = form.watch("occupation");

  const lgas = locationData.lgas;

  const availableWards = useMemo(() => {
    return lgas.find(lga => lga.code === watchLga)?.wards || [];
  }, [watchLga, lgas]);

  const availablePollingUnits = useMemo(() => {
    return availableWards.find(w => w.code === watchWard)?.pollingUnits || [];
  }, [watchWard, availableWards]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate network delay
    setTimeout(() => {
      setIsSubmitting(false);

      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults, particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#BC00BA', '#ff66ff', '#ffffff']
        });
        confetti({
          ...defaults, particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#BC00BA', '#ff66ff', '#ffffff']
        });
      }, 250);

      gooeyToast.success("Registration Successful!", {
        description: `Welcome to NASYOWWA, ${values.fullname}!`,
      });
      form.reset();
    }, 1500);
  }

  return (
    <Card className="border-none bg-background/50 shadow-2xl shadow-brand/10 backdrop-blur-xl ring-1 ring-border/50">
      <CardHeader className="text-center pb-8 border-b border-border/50">
        <CardTitle className="text-2xl font-bold">Member Registration</CardTitle>
        <CardDescription>
          Fill in your details to join the young women movement.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {/* Personal Details Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground border-l-4 border-brand pl-3">Personal Details</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} className="bg-background/80" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select disabled onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-muted/50 text-muted-foreground">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Female">Female (Required)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="08012345678" {...field} maxLength={11} className="bg-background/80" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="18-40" {...field} className="bg-background/80" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Location & Voting Details */}
            <div className="space-y-6 pt-4">
              <h3 className="text-lg font-semibold text-foreground border-l-4 border-brand pl-3">Electoral Information</h3>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="lga"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>L.G.A (Nasarawa State)</FormLabel>
                      <Select onValueChange={(val) => {
                        field.onChange(val);
                        form.setValue("ward", "");
                        form.setValue("pollingUnit", "");
                      }} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background/80">
                            <SelectValue placeholder="Select LGA" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {lgas.map(lga => (
                            <SelectItem key={lga.code} value={lga.code}>{lga.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ward"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ward</FormLabel>
                      <Select disabled={!watchLga} onValueChange={(val) => {
                        field.onChange(val);
                        form.setValue("pollingUnit", "");
                      }} value={field.value} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background/80">
                            <SelectValue placeholder="Select Ward" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableWards.map(ward => (
                            <SelectItem key={ward.code} value={ward.code}>{ward.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pollingUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Polling Unit</FormLabel>
                      <Select disabled={!watchWard} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background/80 text-left h-auto min-h-10 break-words py-2 whitespace-normal">
                            <SelectValue placeholder="Select Polling Unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availablePollingUnits.map(pu => (
                            <SelectItem key={pu.full_code} value={pu.full_code}>
                              <span className="block truncate max-w-[200px] sm:max-w-[150px]">{pu.name}</span>
                              <span className="text-xs text-muted-foreground block">{pu.full_code}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="votersCardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voter's Card Number (VIN)</FormLabel>
                      <FormControl>
                        <Input placeholder="19-digit VIN number" {...field} maxLength={19} className="bg-background/80" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Other Details */}
            <div className="space-y-6 pt-4">
              <h3 className="text-lg font-semibold text-foreground border-l-4 border-brand pl-3">Other Information</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background/80">
                            <SelectValue placeholder="Select Occupation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {occupations.map(occ => (
                            <SelectItem key={occ} value={occ}>{occ}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchOccupation === "Other" && (
                  <FormField
                    control={form.control}
                    name="otherOccupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please Specify</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g. Content Creator" {...field} className="bg-background/80" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>

            {/* Document Uploads */}
            <div className="space-y-6 pt-4">
              <h3 className="text-lg font-semibold text-foreground border-l-4 border-brand pl-3">Document Uploads</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="pictureFile"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Passport Picture</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          className="bg-background/80 file:text-brand file:font-medium file:border-0 file:bg-transparent cursor-pointer"
                          onChange={(e) => onChange(e.target.files?.[0])}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="votersCardFile"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Voter's Card Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          className="bg-background/80 file:text-brand file:font-medium file:border-0 file:bg-transparent cursor-pointer"
                          onChange={(e) => onChange(e.target.files?.[0])}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold shadow-xl shadow-brand/20 transition-all hover:scale-[1.01]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Complete Registration"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
