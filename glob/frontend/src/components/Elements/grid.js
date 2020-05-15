import React from "react";

export const GridItem = ({ post }) => {
  return (
    <React.Fragment>
      <div className="grid-wrap">
        <div className="grid">
          <a href="#" className="grid__item">
            <div className="grid__item-bg"></div>
            <div className="grid__item-wrap">
              <img
                className="grid__item-img"
                src="img/1.jpg"
                alt="Some image"
              />
            </div>
            <h3 className="grid__item-title">Tour of my Life</h3>
            <h4 className="grid__item-number">B05</h4>
          </a>
        </div>
      </div>
      <div className="content">
        <div className="content__item">
          <div className="content__item-intro">
            <img
              className="content__item-img"
              src="img/1.jpg"
              alt="Some image"
            />
            <h2 className="content__item-title">Tour of my life</h2>
          </div>
          <h3 className="content__item-subtitle">
            "How I learned to cherish life after a trip to hell"
          </h3>
          <div className="content__item-text">
            <p>
              When I was in the islands nearly a generation ago, I was
              acquainted with a young American couple who had among their
              belongings an attractive little son of the age of seven—attractive
              but not practicably companionable with me, because he knew no
              English. He had played from his birth with the little Kanakas on
              his father’s plantation, and had preferred their language and
              would learn no other. The family removed to America a month after
              I arrived in the islands, and straightway the boy began to lose
              his Kanaka and pick up English. By the time he was twelve he
              hadn’t a word of Kanaka left; the language had wholly departed
              from his tongue and from his comprehension. Nine years later, when
              he was twenty-one, I came upon the family in one of the lake towns
              of New York, and the mother told me about an adventure which her
              son had been having. By trade he was now a professional diver. A
              passenger boat had been caught in a storm on the lake, and had
              gone down, carrying her people with her. A few days later the
              young diver descended, with his armor on, and entered the
              berth-saloon of the boat, and stood at the foot of the
              companionway, with his hand on the rail, peering through the dim
              water. Presently something touched him on the shoulder, and he
              turned and found a dead man swaying and bobbing about him and
              seemingly inspecting him inquiringly. He was paralyzed with
              fright.
            </p>
            <p>
              His entry had disturbed the water, and now he discerned a number
              of dim corpses making for him and wagging their heads and swaying
              their bodies like sleepy people trying to dance. His senses
              forsook him, and in that condition he was drawn to the surface. He
              was put to bed at home, and was soon very ill. During some days he
              had seasons of delirium which lasted several hours at a time; and
              while they lasted he talked Kanaka incessantly and glibly; and
              Kanaka only. He was still very ill, and he talked to me in that
              tongue; but I did not understand it, of course. The doctor-books
              tell us that cases like this are not uncommon. Then the doctors
              ought to study the cases and find out how to multiply them. Many
              languages and things get mislaid in a person’s head, and stay
              mislaid for lack of this remedy.
            </p>
            <p>
              Several of our passengers belonged in Honolulu, and these were
              sent ashore; but nobody could go ashore and return. There were
              people on shore who were booked to go with us to Australia, but we
              could not receive them; to do it would cost us a quarantine-term
              in Sydney. They could have escaped the day before, by ship to San
              Francisco; but the bars had been put up, now, and they might have
              to wait weeks before any ship could venture to give them a passage
              any whither. And there were hardships for others. An elderly lady
              and her son, recreation-seekers from Massachusetts, had wandered
              westward, further and further from home, always intending to take
              the return track, but always concluding to go still a little
              further; and now here they were at anchor before Honolulu
              positively their last westward-bound indulgence—they had made up
              their minds to that—but where is the use in making up your mind in
              this world? It is usually a waste of time to do it. These two
              would have to stay with us as far as Australia. Then they could go
              on around the world, or go back the way they had come; the
              distance and the accommodations and outlay of time would be just
              the same, whichever of the two routes they might elect to take.
              Think of it: a projected excursion of five hundred miles gradually
              enlarged, without any elaborate degree of intention, to a possible
              twenty-four thousand. However, they were used to extensions by
              this time, and did not mind this new one much.
            </p>
          </div>
        </div>
        <button class="content__close">Close</button>
        <svg class="content__indicator icon icon--caret"></svg>
      </div>
    </React.Fragment>
  );
};
