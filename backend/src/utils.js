function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  )
  if (!matchedPermissions.length) {
    throw new Error(`You do not have sufficient permissions

      : ${permissionsNeeded}

      You Have:

      ${user.permissions}
      `)
  }
}
const leftDomains =
  'cnn.com,nbcnews.com,engadget.com,npr.org,washingtonpost.com,nytimes.com,techcrunch.com,cnbc.com,theguardian.com,new.sky.com,independent.co.uk,theverge.com'
const rightDomains = 'foxnews.com,washingtonexaminer.com,nypost.com,thesun.co.uk,itv.com'
const centerDomains =
  'kcci.com,snopes.com,nbcsports.com,ign.com,space.com,bbc.co.uk,techspot.com,anandtech.com'

exports.leftDomains = leftDomains
exports.rightDomains = rightDomains
exports.centerDomains = centerDomains
exports.hasPermission = hasPermission
