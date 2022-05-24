/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

$(function() {
	/* RSS Feeds test */
	describe('RSS Feeds', function() {
		/* Test to ensure allFeeds variable is defined and not empty */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* Loops through each feed and ensure each URL is defined
		 * and that the URL is not empty. */
		it('have defined non empty URLs', function() {
			for (let i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url.length).not.toBe(0);
			}
		});

		/* Loops through each feed and ensures it has a name defined
		 * and that the name is not empty. */
		it('have defined non empty names', function() {
			for (let i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name.length).not.toBe(0);
			}
		})
	});

	/* "The menu" test */
	describe('The menu', function() {
		/* Test to ensure the menu is hidden by default. */
		it('is hidden by default', function() {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

		/* Test to ensure the menu displays when clicked and
		it hides hide when clicked again. */
		it('changes visibility when clicked', function() {
			let menuIcon = $('.menu-icon-link');

			menuIcon.trigger('click');
			expect($('body').hasClass('menu-hidden')).toBe(false);
			menuIcon.trigger('click');
			expect($('body').hasClass('menu-hidden')).toBe(true);
		})
	});

	/* "Initial Entries" test */
	describe('Initial Entries', function() {
		/* Test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * loadFeed() is asynchronous so this test will require.
		 */
		beforeEach(function(done) {
			loadFeed(0, done);
		});

		/* Test to ensure there is at least a single entry within the feedafter load */
		it('have at least one entry', function(done) {
			expect($('.feed .entry').length).not.toBe(0);
			done();
		});
	});

	/* TODO: Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {
		/* Test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 */
		let firstFeed, secondFeed;

		beforeEach(function(done) {
			loadFeed(1, function() {
				firstFeed = $('.feed').html();
				loadFeed(2, function() {
					done();
					secondFeed = $('.feed').html();
				});
			});
		});

		/* Test to ensure there is a difference between the first and second feed*/
		it('changes content when a new feed is loaded', function(done) {
			expect(firstFeed).not.toBe(secondFeed);
			done();
		});

	});
}());
