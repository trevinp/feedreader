/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* Test to make sure that the allFeeds variable has been defined and that
         * it is not empty.
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL is defined', function () {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Name is defined', function () {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* Test suite for "The menu" */
    describe('The menu', function () {
        /* Test that ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function () {
            const item = document.querySelector('body');
            expect(item.classList.contains('menu-hidden')).toBe(true);
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('changes visibility when clicked', function () {
            const item = document.querySelector('body');
            const menuIcon = document.querySelector('.menu-icon-link');
            menuIcon.click();
            expect(item.classList.contains('menu-hidden')).toBe(false);

            // Click menu again to see if status reverses
            menuIcon.click();
            expect(item.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* Test suite for "Initial Entries" */
    describe('Initial Entries', function () {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('work is completed', function () {
            const item = document.querySelector('.feed .entry');
            // console.log(item);
            expect(item.children.length > 0).toBe(true);
        })
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        let feed1, feed2;

        // Load two feeds and compare them.  Note the feeds will load asyncronously.
        beforeEach(function (done) {
            loadFeed(1, () => {
                feed1 = document.querySelectorAll('.feed .entry')[0];
                loadFeed(2, () => {
                    feed2 = document.querySelectorAll('.feed .entry')[0];
                    done();
                });
            });
        });

        it('feed content changes', function () {
            expect(feed1 !== feed2).toBe(true);
        })
    });
}());
