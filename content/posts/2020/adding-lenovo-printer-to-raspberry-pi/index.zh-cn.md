---
title: "将联想M7605D打印机连接树莓派"
subtitle: ""
date: 2020-07-25T19:07:25+08:00
lastmod: 2020-07-25T19:07:25+08:00
draft: false
author: "Simon"
authorLink: ""
description: "本文讲述如何从联想官方驱动中提取在Linux/树莓派上安装打印机所需的PPD文件，以供CUPS打印系统使用。"

tags: ["树莓派", "打印机"]
categories: ["生活点滴"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "IMG_5161-min.JPG"
featuredImagePreview: "IMG_5161-min.JPG"

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
---

<!--more-->

One of the main benefits of connecting the printer to Raspberry Pi is to enable remote printing service, even if the printer is a cabled one.  

There are already a lot of posts on the internet discussing how you can set up your Raspberry Pi and connect it with your printer (with [CUPS](https://www.cups.org/)), like [*How to add a printer to your raspberry pi or other Linux Computer*](https://www.howtogeek.com/169679/how-to-add-a-printer-to-your-raspberry-pi-or-other-linux-computer/). So this is not the main focus of this post. 

The focus of this post is on **how to extract a PPD file from the original printer driver package** provided by the manufacturer, which is needed by the Linux system (and of course, Raspberry Pi), when CUPS doesn't have native support on it. 

Specifically, I am using my **Lenovo M7605D** as an example. 



## PostScript Printer Description (PPD) File

Developed by Adobe, the PPD file ([Wikipedia](https://en.wikipedia.org/wiki/PostScript_Printer_Description)) is a piece of information that describes the entire set of features and capabilities available for [PostScript](https://en.wikipedia.org/wiki/PostScript) printer. Basically it describes how the printer should organize and print the contents when documents are sent to the system printing service.

## Locating the PPD file

Once downloaded the driver package (which is an ISO file) from Lenovo [Driver Page](https://newsupport.lenovo.com.cn/driveList.html?fromsource=driveList&selname=m7605d), extract it and open the folder `/install`, you'll see a lot of model folders. 

![image-20200725212618877](image-20200725212618877.png "The Driver Page")

{{< image src="image-20200725213307035.png" caption="The 'driver' folder after extraction" width="55%">}}

Going into that you'll see a file `/install/M7605D/chneng/Brinst_Lang.ini` which specifies the folder for the Post-Script driver for the model: 

{{< image src="image-20200725214711228.png" caption="The location of driver file" width="55%">}}

And that's what we want

{{< image src="image-20200725215405411.png" caption="Driver found! It seems my model m7605d is using the same driver as m7675dxf/m7615dna" width="25%">}}

## Uncompressing the PPD file

It turns out that the ppd file provided by Lenovo, which has 'pp_' as suffix, is compressed. (originally I thought it is encrypted when I saw those gibberish in the file but it is actually not)

{{< image src="image-20200725220428041.png" caption="The file head 'SZDD' in the beginning shows that it is an old compressed format, which is rare to see now" width="90%">}}

{{<image src="image-20200725221019932.png" caption="SZDD file info on [Wikipedia](http://fileformats.archiveteam.org/wiki/MS-DOS_installation_compression)" width="80%">}}

Having a quick search on Google makes me aware of that this format could be uncompressed by MS-DOS EXPAND.EXE program. And surprisingly also, it could be directly uncompressed by 7-ZIP. 

{{<image src="image-20200725221752876.png" caption="It turns out that the file could be directly uncompressed by 7-ZIP, or in a more geek's way, using windows 'EXPAND' command" width="80%">}}

In the end, the .ppd file is nicely extracted. 