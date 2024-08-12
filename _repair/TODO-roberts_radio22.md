---
title: "Roberts Radio Voltage"
collection: repair
permalink: /repair/TODO-roberts_radio
venue: "Sparks Repair Cafe"
Problem: "Screen won’t turn on"
Solution: ""Removed the buck converter,  replace with an LDO""
---
```
Problem:    Screen won’t turn on 
Solution:   "Removed the buck converter,  replace with an LDO" 
Brand:  Roberts 
Cost new:   £120.00 
Cost of fix:    ~15p 
Age:    TODO 
Success?:   Yes 
```
This was a marathon! I don’t usually spend so long on repairs, but a customer came in with a radio that was very sentimental to them, as a family member had bought it for them and they loved it dearly. I spent a long time looking at what was wrong with it. For a lot of the Roberts Radio line they provide schematics, service manual and block diagram! I was very impressed with the amount of information they give. Unfortunately, this model didn’t give you any of that… So I had to analyse the circuit on the board and figure out what things should be doing, and then figure out whether what they are currently doing are as designed. I came to the conclusion eventually that one of the supply rails for the microcontroller and radio receiver, was only receiving 3.21V, which when I first spotted that assumed it would be ‘enough’ for the necessary components to use. The add-on board that manages the radio and audio processing was a black box, no documentation or datasheets anywhere to be found. I deduced that it needed a 1.2V rail, as well as a 3.3V rail. I isolated the device that was generating the 3.3V by removing a diode in the buck converter, and then added a 3.3V supply from my bench top directly into that pad to see if that was the issue, and lo and behold, it works!! Then I just had to figure out how best to do this inside the device so that I could reassemble it. As ugly as it ended up being, I replaced the buck converter with an LDO providing 3.3V, as I could find the corresponding SMD pads to match when I soldered the LDO in a specific pattern. They use buck converters for this as it’s more efficient and as you run these devices from batteries, you want them as efficient as possible, but I figured it wasn’t a huge loss by contributing to a net negative in effficiency for the device… Reassembled the radio and got a very happy customer.
![](/images/repair_cafe/roberts_radio_voltage/roberts_radio_voltage_1.jpg)
![](/images/repair_cafe/roberts_radio_voltage/roberts_radio_voltage_3.jpg)
![](/images/repair_cafe/roberts_radio_voltage/roberts_radio_voltage_12.jpg)
![](/images/repair_cafe/roberts_radio_voltage/roberts_radio_voltage_7.jpg)
![](/images/repair_cafe/roberts_radio_voltage/roberts_radio_voltage_8.jpg)
![](/images/repair_cafe/roberts_radio_voltage/roberts_radio_voltage_4.jpg)
![](/images/repair_cafe/roberts_radio_voltage/roberts_radio_voltage_2.jpg)
![](/images/repair_cafe/roberts_radio_voltage/roberts_radio_voltage_10.jpg)
![](/images/repair_cafe/roberts_radio_voltage/roberts_radio_voltage_5.jpg)
![](/images/repair_cafe/roberts_radio_voltage/roberts_radio_voltage_6.jpg)
![](/images/repair_cafe/roberts_radio_voltage/roberts_radio_voltage_11.jpg)
![](/images/repair_cafe/roberts_radio_voltage/roberts_radio_voltage_9.jpg)
