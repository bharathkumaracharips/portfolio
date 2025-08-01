import RainText from "@/app/components/ui/matrix"

export function RainTextDemo() {
    
    return (
        <>
          <RainText 
          fontSize={20}
          color="#00ff00"
          characters="01"
          fadeOpacity={0.1}
          speed={1.0}
          opacity={0.25}
          />
          
         </>
    )

}