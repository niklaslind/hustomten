//
//  ViewController.swift
//  thbiTest
//
//  Created by Thomas Bindzau on 01/06/15.
//  Copyright (c) 2015 Tomteverkstan. All rights reserved.
//

import UIKit

class ViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {

    @IBOutlet var appsTableView : UITableView!
    var tableData = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        getMyIssues("Madonna")
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    func tableView(tableView: UITableView, numberOfRowsInSection section:    Int) -> Int {
        return tableData.count
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell: UITableViewCell = UITableViewCell(style: UITableViewCellStyle.Subtitle, reuseIdentifier: "MyTestCell")
        
        if let rowData: NSDictionary = self.tableData[indexPath.row] as? NSDictionary,
            // Grab the artworkUrl60 key to get an image URL for the app's thumbnail
            urlString = rowData["artworkUrl60"] as? String,
            // Create an NSURL instance from the String URL we get from the API
            imgURL = NSURL(string: urlString),
            // Get the formatted price string for display in the subtitle
            formattedPrice = rowData["formattedPrice"] as? String,
            // Download an NSData representation of the image at the URL
            imgData = NSData(contentsOfURL: imgURL),
            // Get the track name
            trackName = rowData["trackName"] as? String {
                // Get the formatted price string for display in the subtitle
                cell.detailTextLabel?.text = formattedPrice
                // Update the imageView cell to use the downloaded image data
                cell.imageView?.image = UIImage(data: imgData)
                // Update the textLabel text to use the trackName from the API
                cell.textLabel?.text = trackName
        }
        return cell
    }

    func getMyIssues(user: String) {
        let escapedString = user.stringByAddingPercentEscapesUsingEncoding(NSUTF8StringEncoding)
        //let urlPath : String = "https://guarded-coast-8897.herokuapp.com/api/issue"
//        let urlPath: String = "http://itunes.apple.com/search?term=\(escapedString)&media=software"
        let urlPath: String = "http://itunes.apple.com/search?term=Madonna&media=software"
        let url = NSURL(string: urlPath)
        let session = NSURLSession.sharedSession()
        let task = session.dataTaskWithURL(url!, completionHandler: {data, response, error -> Void in
            println("Done")
            if (error != nil){
                println(error.localizedDescription)
            }
            var err: NSError?
            if let jsonResult = NSJSONSerialization.JSONObjectWithData(data, options: NSJSONReadingOptions.MutableContainers, error: &err) as? NSDictionary {
                if (err != nil){
                    println("Error \(err!.localizedDescription)")
                }
                if let results: NSArray = jsonResult["results"] as? NSArray {
                    dispatch_async(dispatch_get_main_queue(), {
                        self.tableData = results
                        self.appsTableView!.reloadData()
                    })
                }
            }
        })
        task.resume()
    }
}