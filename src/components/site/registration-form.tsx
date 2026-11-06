import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { gooeyToast } from "goey-toast";

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
import {
  OCCUPATIONS,
  registrationFormSchema,
  type RegistrationFormInput,
  type RegistrationFormValues,
} from "@/lib/registration";
import { uploadRegistration } from "@/lib/upload-registration";
import { Progress } from "@/components/ui/progress";

export function RegistrationForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  const form = useForm<RegistrationFormInput, unknown, RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
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
      votersCardFile: undefined as unknown as File,
      pictureFile: undefined as unknown as File,
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

  async function onSubmit(values: RegistrationFormValues) {
    setIsSubmitting(true);
    setUploadPercent(0);
    try {
      const body = new FormData();
      const fields = {
        fullname: values.fullname,
        gender: values.gender,
        phone: values.phone,
        age: String(values.age),
        lga: values.lga,
        ward: values.ward,
        pollingUnit: values.pollingUnit,
        votersCardNumber: values.votersCardNumber,
        occupation: values.occupation,
        otherOccupation: values.otherOccupation ?? "",
      };
      for (const [key, value] of Object.entries(fields)) {
        body.append(key, value);
      }
      body.append("votersCardFile", values.votersCardFile);
      body.append("pictureFile", values.pictureFile);

      await uploadRegistration(body, setUploadPercent);

      form.reset();
      navigate({ to: "/registration-success" });
    } catch (error) {
      gooeyToast.error("Registration failed", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="border-none bg-background/50 shadow-2xl shadow-brand/10 backdrop-blur-xl ring-1 ring-border/50">
      <CardHeader className="text-center pb-8 border-b border-border/50">
        <CardTitle className="text-2xl font-bold">NAS-PYW Member Registration</CardTitle>
        <CardDescription>
          Are you a young woman ready to take part in politics and shape governance in Nasarawa State? Connect with NAS-PYW to learn about membership and upcoming activities.
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
                        <Input placeholder="19 letters and numbers" {...field} maxLength={19} className="bg-background/80 uppercase" />
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
                          {OCCUPATIONS.map(occ => (
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

            {isSubmitting && (
              <div className="space-y-2" role="status" aria-live="polite">
                <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                  <span>
                    {uploadPercent < 100 ? "Uploading files..." : "Saving your registration..."}
                  </span>
                  <span className="tabular-nums text-brand">{uploadPercent}%</span>
                </div>
                <Progress value={uploadPercent} className="h-2.5 bg-brand/15 [&>div]:bg-brand" />
              </div>
            )}

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
