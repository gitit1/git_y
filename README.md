# Y - Upload Your Images and Share Them

## http://y.gititregev.com/

### Assumptions for this Project:
- There can be a lot of data an maybe in the feature users and additional data ,and this is why it connected to a mongoDB and not saving the image Metadata in jsonfile or similar approch
- Since it need to go directly to production I decided to use Material UI as my base styling design system. so it will be easier to match every component and design in the project
- I added some routes and data for check up (server status, see Db route...)
- Mix Date for expartion date: Today, Max Date: 2 mounts from Today
- The backend controls the process of deleteing images (and the testing of this process as well)
- handle dev, test, and production modes.
