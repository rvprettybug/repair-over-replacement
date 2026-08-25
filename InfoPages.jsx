import StaticPage from './StaticPage'

export function About() {
  return (
    <StaticPage title="About Repair Over Replacement">
      <p>Repair Over Replacement connects people with trusted local repair professionals so that broken products get fixed instead of thrown away.</p>
      <p>We started this platform because too many working products end up in landfills simply because finding a reliable repairer is harder than clicking "buy now" on a replacement. Our directory of verified repairers across Punjab and beyond makes repair the easy choice again.</p>
    </StaticPage>
  )
}

export function Contact() {
  return (
    <StaticPage title="Contact Us">
      <p>Have a question about a repair, a booking, or becoming a repairer on the platform? We'd love to hear from you.</p>
      <p>Email: support@repairoverreplacement.example<br />Phone: +91 98765 43210<br />Hours: Monday – Saturday, 10:00 AM – 7:00 PM</p>
    </StaticPage>
  )
}

export function Help() {
  return (
    <StaticPage title="Help Center">
      <p><strong>How do I book a repair?</strong> Use "Find a Repairer" to browse verified experts, or submit a Repair Request and let a nearby repairer respond.</p>
      <p><strong>How accurate are cost estimates?</strong> Estimates are ranges based on typical repair costs for similar issues. Final pricing depends on your product's condition and the repairer you choose.</p>
      <p><strong>Can I cancel a repair request?</strong> Yes, from "My Repairs" you can cancel any request that hasn't been completed yet.</p>
    </StaticPage>
  )
}

export function Privacy() {
  return (
    <StaticPage title="Privacy Policy">
      <p>This is a demo application. In this prototype, account details, repair requests, and messages are stored only in your browser's local storage and are never sent to a server.</p>
      <p>In a production deployment, we would collect only the information needed to connect you with repairers and process bookings, and would never sell personal data to third parties.</p>
    </StaticPage>
  )
}

export function Terms() {
  return (
    <StaticPage title="Terms of Service">
      <p>This is a demonstration project built for educational purposes. It is not a live commercial service, and no real repairs, payments, or bookings are processed.</p>
      <p>By using this demo, you agree that any data entered is for testing only and may be cleared at any time.</p>
    </StaticPage>
  )
}
