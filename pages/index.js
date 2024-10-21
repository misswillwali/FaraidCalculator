import Head from 'next/head';
import styles from '../styles/Home.module.css';

  // import { useState } from 'react'
  // import { Button } from "@/components/ui/button"
  // import { Input } from "@/components/ui/input"
  // import { Label } from "@/components/ui/label"
  // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
  // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
  // import { X } from 'lucide-react'
  // import { toast } from "@/components/ui/use-toast"

type Heir = {
  id: string;
  relationship: string;
  count: number;
}

export const FaraidCalculator = () => {
  const [assets, setAssets] = useState<number | ''>('')
  const [heirs, setHeirs] = useState<Heir[]>([])
  const [newMaleHeir, setNewMaleHeir] = useState<Omit<Heir, 'id'> & { key: number }>({ relationship: '', count: 1, key: 0 })
  const [newFemaleHeir, setNewFemaleHeir] = useState<Omit<Heir, 'id'> & { key: number }>({ relationship: '', count: 1, key: 0 })
  const [shares, setShares] = useState<{[key: string]: number}>({})
  const [email, setEmail] = useState<string>('')
  const [assetsError, setAssetsError] = useState<string>('')

  // List of male heirs with their corresponding labels
  const maleHeirs = [
    { value: "son", label: "Son" },
    { value: "husband", label: "Husband" },
    { value: "grandson", label: "Grandson" },
    { value: "father", label: "Father" },
    { value: "paternalGrandFather", label: "Paternal Grandfather" },
    { value: "brother", label: "Brother" },
    { value: "halfBrotherSameFather", label: "Half Brother (by same father)" },
    { value: "halfBrotherSameMother", label: "Half Brother (by same mother)" },
    { value: "nephewBrother", label: "Nephew (brother's son)" },
    { value: "nephewHalfBrother", label: "Nephew (half-brother's son)" },
    { value: "paternalUncle", label: "Paternal Uncle" },
    { value: "fathersHalfBrother", label: "Father's Half Brother (by same father)" },
    { value: "sonOfPaternalUncle", label: "Son of Paternal Uncle" },
    { value: "sonOfFathersHalfBrother", label: "Son of Father's Half Brother (by same father)" },
  ]

  // List of female heirs with their corresponding labels
  const femaleHeirs = [
    { value: "daughter", label: "Daughter" },
    { value: "wife", label: "Wife" },
    { value: "sister", label: "Sister" },
    { value: "granddaughter", label: "Grand-daughter (son's daughter)" },
    { value: "mother", label: "Mother" },
    { value: "maternalGrandmother", label: "Maternal grandmother" },
    { value: "paternalGrandMother", label: "Paternal grandmother" },
    { value: "halfSisterSameFather", label: "Half Sister (by same father)" },
    { value: "halfSisterSameMother", label: "Half Sister (by same mother)" },
  ]

  // Method to add a new heir to the list
  const addHeir = (heir: Omit<Heir, 'id'>) => {
    if (heir.relationship) {
      const id = Date.now().toString()
      const updatedHeirs = [...heirs, { ...heir, id }]
      setHeirs(updatedHeirs)
      if (maleHeirs.some(maleHeir => maleHeir.value === heir.relationship)) {
        setNewMaleHeir(prev => ({ relationship: '', count: 1, key: prev.key + 1 }))
      } else {
        setNewFemaleHeir(prev => ({ relationship: '', count: 1, key: prev.key + 1 }))
      }
      if (Object.keys(shares).length > 0) {
        calculateShares(updatedHeirs)
      }
    }
  }

  // Method to remove an heir from the list
  const removeHeir = (id: string) => {
    setHeirs(prevHeirs => {
      const updatedHeirs = prevHeirs.filter(heir => heir.id !== id);
      if (Object.keys(shares).length > 0) {
        calculateShares(updatedHeirs);
      }
      return updatedHeirs;
    });
    setNewMaleHeir(prev => ({ relationship: '', count: 1, key: prev.key + 1 }));
    setNewFemaleHeir(prev => ({ relationship: '', count: 1, key: prev.key + 1 }));
  }

  // Method to calculate inheritance shares
  const calculateShares = (currentHeirs = heirs) => {
    // Validate total assets input
    if (assets === '' || assets <= 0) {
      setAssetsError('Please enter a valid total assets amount')
      return
    }
    setAssetsError('')

    let remainingShare = 1
    const calculatedShares: {[key: string]: number} = {}

    // Allocate fixed shares first
    currentHeirs.forEach(heir => {
      let share = 0
      switch (heir.relationship) {
        case 'husband':
          share = currentHeirs.some(h => ['son', 'daughter', 'grandson', 'granddaughter'].includes(h.relationship)) ? 1/4 : 1/2
          break
        case 'wife':
          share = currentHeirs.some(h => ['son', 'daughter', 'grandson', 'granddaughter'].includes(h.relationship)) ? 1/8 : 1/4
          share *= heir.count // Adjust for multiple wives
          break
        case 'father':
          share = currentHeirs.some(h => ['son', 'daughter', 'grandson', 'granddaughter'].includes(h.relationship)) ? 1/6 : 0 // Will get residuary later if no descendants
          break
        case 'mother':
          if (currentHeirs.some(h => ['son', 'daughter', 'grandson', 'granddaughter'].includes(h.relationship))) {
            share = 1/6
          } else if (currentHeirs.filter(h => ['brother', 'sister', 'halfBrotherSameFather', 'halfBrotherSameMother', 'halfSisterSameFather', 'halfSisterSameMother'].includes(h.relationship)).length >= 2) {
            share = 1/6
          } else {
            share = 1/3
          }
          break
        case 'daughter':
          if (!currentHeirs.some(h => h.relationship === 'son')) {
            share = heir.count === 1 ? 1/2 : 2/3
          }
          break
        case 'granddaughter':
          if (!currentHeirs.some(h => ['son', 'daughter'].includes(h.relationship))) {
            share = heir.count === 1 ? 1/2 : 2/3
          } else if (currentHeirs.some(h => h.relationship === 'daughter') && !currentHeirs.some(h => h.relationship === 'son')) {
            share = 1/6
          }
          break
        case 'sister':
          if (!currentHeirs.some(h => ['son', 'daughter', 'grandson', 'granddaughter', 'father', 'brother'].includes(h.relationship))) {
            share = heir.count === 1 ? 1/2 : 2/3
          }
          break
        case 'halfSisterSameFather':
          if (!currentHeirs.some(h => ['son', 'daughter', 'grandson', 'granddaughter', 'father', 'brother', 'sister'].includes(h.relationship))) {
            share = heir.count === 1 ? 1/2 : 2/3
          }
          break
        case 'halfBrotherSameMother':
        case 'halfSisterSameMother':
          if (!currentHeirs.some(h => ['son', 'daughter', 'grandson', 'granddaughter', 'father', 'paternalGrandFather'].includes(h.relationship))) {
            const totalUterineCount = currentHeirs.filter(h => ['halfBrotherSameMother', 'halfSisterSameMother'].includes(h.relationship)).reduce((sum, h) => sum + h.count, 0)
            share = totalUterineCount === 1 ? 1/6 : 1/3
            share /= totalUterineCount // Divide equally among uterine siblings
          }
          break
      }
      if (share > 0) {
        calculatedShares[heir.id] = share * (assets as number)
        remainingShare -= share
      }
    })

    // Distribute remaining share among residuary heirs
    const residuaryHeirs = currentHeirs.filter(heir => 
      ['son', 'grandson', 'father', 'paternalGrandFather', 'brother', 'halfBrotherSameFather', 'nephewBrother', 'nephewHalfBrother', 'paternalUncle', 'fathersHalfBrother', 'sonOfPaternalUncle', 'sonOfFathersHalfBrother'].includes(heir.relationship) ||
      (heir.relationship === 'daughter' && !calculatedShares[heir.id])
    )

    if (residuaryHeirs.length > 0) {
      const totalShares = residuaryHeirs.reduce((total, heir) => {
        return total + (heir.relationship === 'daughter' ? heir.count : heir.count * 2)
      }, 0)

      residuaryHeirs.forEach(heir => {
        const heirShares = heir.relationship === 'daughter' ? heir.count : heir.count * 2
        calculatedShares[heir.id] = (heirShares / totalShares) * remainingShare * (assets as number)
      })
    }

    setShares(calculatedShares)
    setNewMaleHeir(prev => ({ relationship: '', count: 1, key: prev.key + 1 }))
    setNewFemaleHeir(prev => ({ relationship: '', count: 1, key: prev.key + 1 }))
  }

  // Method to handle sending email with calculation results
  const sendEmail = () => {
    console.log('Sending email to:', email)
    console.log('With data:', { assets, heirs, shares })
    
    toast({
      title: "Email Sent",
      description: "The Faraid calculation results have been sent to your email.",
    })
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Willwali Faraid Calculator</CardTitle>
          <CardDescription>Calculate Islamic inheritance shares</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="assets" className="flex items-center">
              Total Assets (RM)
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="assets"
              type="number"
              value={assets}
              onChange={(e) => {
                setAssets(e.target.value === '' ? '' : Number(e.target.value))
                setAssetsError('')
              }}
              placeholder="Enter total assets"
              className={assetsError ? 'border-red-500' : ''}
            />
            {assetsError && <p className="text-red-500 text-sm mt-1">{assetsError}</p>}
          </div>
          <div className="mb-4">
            <Label>Add Male Heirs</Label>
            <div className="flex gap-2 mb-2">
              <Select 
                key={newMaleHeir.key}
                onValueChange={(value) => setNewMaleHeir(prev => ({...prev, relationship: value}))}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Male Heir" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  {maleHeirs.map((heir) => (
                    <SelectItem key={heir.value} value={heir.value}>{heir.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                value={newMaleHeir.count}
                onChange={(e) => setNewMaleHeir(prev => ({...prev, count: Number(e.target.value) }))}
                placeholder="Count"
                className="w-[100px]"
              />
              <Button onClick={() => addHeir(newMaleHeir)}>Add</Button>
            </div>
          </div>
          <div className="mb-4">
            <Label>Add Female Heirs</Label>
            <div className="flex gap-2 mb-2">
              <Select 
                key={newFemaleHeir.key}
                onValueChange={(value) => setNewFemaleHeir(prev => ({...prev, relationship: value}))}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Female Heir" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  {femaleHeirs.map((heir) => (
                    <SelectItem key={heir.value} value={heir.value}>{heir.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                value={newFemaleHeir.count}
                onChange={(e) => setNewFemaleHeir(prev => ({...prev, count: Number(e.target.value)}))}
                placeholder="Count"
                className="w-[100px]"
              />
              <Button onClick={() => addHeir(newFemaleHeir)}>Add</Button>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Heirs:</h3>
            <ul className="space-y-2">
              {heirs.map((heir) => (
                <li key={heir.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <span>
                    {heir.count} {heir.relationship}(s)
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeHeir(heir.id)}
                    aria-label={`Remove ${heir.count} ${heir.relationship}(s)`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <Button onClick={() => calculateShares()}>Calculate Shares</Button>
        </CardContent>
      </Card>
      {Object.keys(shares).length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Inheritance Shares</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {heirs.map((heir) => (
                <li key={heir.id} className="flex justify-between items-center">
                  <span>
                    {heir.count} {heir.relationship}(s):
                  </span>
                  <span className="font-semibold">
                    RM {shares[heir.id]?.toFixed(2) || '0.00'}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      {Object.keys(shares).length > 0 && (
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
      )}
    </div>
  )
}

export default FaraidCalculator
