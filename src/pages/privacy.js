import Link from "next/link";
import { Mainframe } from "@/blocks/Mainframe";

const Page = () => {
    return (
        <Mainframe title="Supertype Collective | Privacy Policy">
            <main className="w-full prose lg:prose-xl my-4 max-w-4xl text-justify">
                <h3 className="text-2xl">Privacy Policy</h3>
                <p className="text-sm text-gray-300">Last updated: 2023-07-11</p>

                <div className="divider"></div>
                <p>
                    This page is used to inform visitors regarding our
                    policies with the collection, use, and disclosure of Personal
                    Information if anyone decided to use our Service.
                </p>
                <p>
                    If you choose to use our Service, then you agree to
                    the collection and use of information in relation to this
                    policy. The Personal Information that we collect is
                    used for providing and improving the Service. We will not use or share your information with
                    anyone except as described in this Privacy Policy.
                </p>
                <p>
                    The terms used in this Privacy Policy have the same meanings
                    as in our Terms and Conditions, which are accessible at
                    Supertype Collective unless otherwise defined in this Privacy Policy.
                </p>
                <p><strong>Information Collection and Use</strong></p>
                <p>
                    For a better experience, while using our Service, we
                    may require you to provide us with certain personally
                    identifiable information, including but not limited to Name, Email, Company. The information that
                    we request will be retained by us and used as described in this privacy policy.
                </p>
                <p>
                    This app uses Supertype&apos;s Umai, a fork of the open source project Umami -- a simple, fast, privacy-focused alternative to
                    Google Analytics.
                </p>
                <ul>
                    <li>
                        <Link href="https://github.com/supertypeai/umai" target="_blank" rel="noopener noreferrer" className="link link-info">Umai</Link>
                    </li>
                </ul>
                <p>

                </p> <p><strong>Cookies</strong></p> <p>
                    Cookies are files with a small amount of data that are
                    commonly used as anonymous unique identifiers. These are sent
                    to your browser from the websites that you visit and are
                    stored on your computer.
                </p> <p>
                    This Service does not use these “cookies” explicitly. However,
                    the app may use third-party code and libraries that use
                    “cookies” to collect information and improve their services.
                    You have the option to either accept or refuse these cookies
                    and know when a cookie is being sent to your device. If you
                    choose to refuse our cookies, you may not be able to use some
                    portions of this Service.
                </p> <p><strong>Service Providers</strong></p> <p>
                    We may employ third-party companies and
                    individuals due to the following reasons:
                </p> <ul><li>To facilitate our Service;</li> <li>To provide the Service on our behalf;</li> <li>To perform Service-related services; or</li> <li>To assist us in analyzing how our Service is used.</li></ul> <p>
                    We want to inform users of this Service
                    that these third parties have access to their Personal
                    Information. The reason is to perform the tasks assigned to
                    them on our behalf. However, they are obligated not to
                    disclose or use the information for any other purpose.
                </p> <p><strong>Security</strong></p> <p>
                    We value your trust in providing us your
                    Personal Information, thus we are striving to use commercially
                    acceptable means of protecting it. But remember that no method
                    of transmission over the internet, or method of electronic
                    storage is 100% secure and reliable, and we cannot
                    guarantee its absolute security.
                </p> <p><strong>Links to Other Sites</strong></p> <p>
                    This Service may contain links to other sites. If you click on
                    a third-party link, you will be directed to that site. Note
                    that these external sites are not operated by us.
                    Therefore, we strongly advise you to review the
                    Privacy Policy of these websites. We have
                    no control over and assume no responsibility for the content,
                    privacy policies, or practices of any third-party sites or
                    services.
                </p> <p><strong>Children&apos;s Privacy</strong></p> <div><p>
                    These Services do not address anyone under the age of 13.
                    We do not knowingly collect personally
                    identifiable information from children under 13 years of age. In the case
                    we discover that a child under 13 has provided
                    us with personal information, we immediately
                    delete this from our servers. If you are a parent or guardian
                    and you are aware that your child has provided us with
                    personal information, please contact us so that
                    we will be able to do the necessary actions.
                </p></div>  <p><strong>Changes to This Privacy Policy</strong></p> <p>
                    We may update our Privacy Policy from
                    time to time. Thus, you are advised to review this page
                    periodically for any changes. We will
                    notify you of any changes by posting the new Privacy Policy on
                    this page.
                </p>
                <p><strong>Contact Us</strong></p> <p>
                    If you have any questions or suggestions about our
                    Privacy Policy, do not hesitate to contact us at s@supertype.ai.
                </p>
            </main>

        </Mainframe>
    )
}

export default Page;