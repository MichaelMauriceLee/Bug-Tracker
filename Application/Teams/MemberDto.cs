/*
 * Data Transfer Object to allow entity framework to get data w/o self references
 */

using System;

namespace Application.Teams
{
    public class MemberDto
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public bool IsManager { get; set; }
    }
}