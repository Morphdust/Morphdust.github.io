---
title: "Mangled Cable – Scooter"
collection: repair
permalink: /repair/TODO-e_scooter
venue: "Sparks Repair Cafe"
Problem: "Exploded PCB from cable being crushed"
Solution: "No Fix"
---
```
Problem:    Exploded PCB from cable being crushed 
Solution:   No Fix 
Brand:  Halfords 
Cost new:   £90 
Cost of fix:    0p 
Age:    TODO 
Success?:   No 
```
Scooter came in, it wouldn’t turn on at all and the electric motor wouldn’t spin. Taking it apart, when looking at the PCB there was a very obvious track that had gotten so hot it de-laminated itself and burnt the copper track such that it was an open circuit! When taking it further apart, what had happened was the control and power cables that go up to the control module, had been crushed in a pinch point in the scooter stem, causing a GPIO line to the microcontroller to get a whopping 24V! This was the GPIO line that measures the throttle, so once I’d sorted and fixed the cable, even though it would turn on, and the micro would do something (send signals to the gate drivers), the GPIO pin on the micro was toast, and the entire thing would have to be replaced. As the code to flash the micro is unavailable, it is essentially un-fixable. I looked online for suitable brushless motor controllers at 24V, but couldn’t find one that would fit the requirements for the scooter. Unfortunately, the whole electric portion of this scooter is now broken. It still functions as a scooter though!
![](/images/repair_cafe/e_scooter/e_scooter_9.jpg)
![](/images/repair_cafe/e_scooter/e_scooter_4.jpg)
![](/images/repair_cafe/e_scooter/e_scooter_6.jpg)
![](/images/repair_cafe/e_scooter/e_scooter_3.jpg)
![](/images/repair_cafe/e_scooter/e_scooter_1.jpg)
![](/images/repair_cafe/e_scooter/e_scooter_2.jpg)
![](/images/repair_cafe/e_scooter/e_scooter_5.jpg)
![](/images/repair_cafe/e_scooter/e_scooter_8.jpg)
![](/images/repair_cafe/e_scooter/e_scooter_7.jpg)
